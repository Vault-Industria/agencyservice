const observers = [];
export default Object.freeze({
  notify:(data)=>observers.forEach((observer)=> observer(data)),
  subscribe:(func)=>observers.push(func),
  unsbscribe:(func)=>{
    [...observers].forEach((observer,index)=>{
      if(observer === func){
        observers.splice(index,1);
      }
    })
  }
})