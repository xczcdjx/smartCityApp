export function debounce(callback,time) {
    let timeId=null;
    // 返回一个函数
    return function (e) {
        // 判断
        if (timeId !=null){
            clearTimeout(timeId);
        }
        timeId=setTimeout(()=>{
            callback.call(this,e);
            // 重置定时器变量
            timeId=null;
        },time);
    }
}
export function throttle(callback,wait) {
    // 定义开始时间
    let start=0;
    return function (e) {
        // 获取当前时间
        let now=Date.now();
        // 判断
        if (now-start >= wait){
            callback.call(this,e);
            // 修改开始时间
            start=now;
        }
    }
}