import Router from 'koa-router'
import axios from './utils/axios'

let router = new Router({prefix: '/search'})

router.get('/top', async (ctx) => {
    console.log(1)
    // axios.get(`http://api.map.baidu.com/place/v2/search?query=火锅&region=上海&output=json&ak=sWHYsEx1520Ha65G6KUcmYtOgNOY4oPS`).then((res)=> {
    //     console.log(res)
    // })
    ctx.body = {
        code: 0
    }
})

router.get('/resultsByKeywords', async (ctx) => {
    
})

export default router