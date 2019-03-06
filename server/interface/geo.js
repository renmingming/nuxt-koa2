import Router from 'koa-router'
import axios from './utils/axios'

let router = new Router({prefix: '/geo'})

const sign = ''

router.get('/getPosition', async (ctx) => {
    let {status, data: {province, city}} = await axios.get('/getPosition', async (ctx) => {
        // http://cp-tools.cn/geo/getPosition?sign=${sign}
        let res = await axios.get(`http://pv.sohu.com/cityjson`)
        console.log(res)
        if(res === 200) {
            ctx.body = {
                province,
                city
            }
        }else{
            ctx.body = {
                province: '',
                city: ''
            }
        }
    })
})

export default router