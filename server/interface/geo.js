import Router from 'koa-router'
import axios from './utils/axios'
import Menu from '../dbs/models/menu'
import Provinces from '../dbs/models/provinces'
import City from '../dbs/models/cities'

let router = new Router({prefix: '/geo'})

router.get('/getPosition', async (ctx) => {
    // http://cp-tools.cn/geo/getPosition?sign=${sign}
    let res = await axios.get(`http://pv.sohu.com/cityjson?ie=utf-8`)
    // console.log(res.data.split('=')[1].trim().split(';')[0])
    let {cname} = JSON.parse(res.data.split('=')[1].trim().split(';')[0])
    if(res.status === 200) {
        ctx.body = {
            province:'',
            city: cname,
        }
    }else{
        ctx.body = {
            province: '',
            city: '上海'
        }
    }
})

router.get('/menus', async (ctx) => {
    let menu = await Menu.find()
    if(menu.length) {
        ctx.body = {
            code: 0,
            menus: menu[0].menu
        }
    }else{
        ctx.body = {
            code: -1,
            menus: []
        }
    }
})

router.get('/province', async (ctx) => {
    let province = await Provinces.find()
    ctx.body = {
        code: 0,
        province: province.map(item => {
            return {
                id: item.id,
                value: item.value[0]
            }
        })
    }
})

router.get('/province/:id', async (ctx) => {
    let city = await City.findOne({id: ctx.params.id})
    ctx.body = {
        code: 0, 
        city: city.value.map(item => {
            return {
                province: item.province,
                id: item.id,
                name: item.name
            }
        })
    }
})

router.get('/city', async (ctx) => {
    let city = []
    let result = await City.find()
    result.forEach(item => {
        city = city.concat(item.value)
    })
    ctx.body = {
    code: 0,
    city: city.map(item => {
      return {
        province: item.province,
        id: item.id,
        name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
          ? item.province
          : item.name
      }
    })
  }
})

export default router