// const { decryption } = require("./secure");
// const map = require("lodash.map");
// const { get,update } = require("lodash");

const response = ({ success = true, error = null, payload = null, id = null, decryptFields = [] }) => {
    // if (decryptFields.length > 0) {
    //     for (let decryptField of decryptFields) {     
    //         valueReplace(payload, decryptField, (v)=>{
    //             return decryption(v);
    //         })
    //     }

    // }
    if (id) {
        return ({ success, error, payload, id })
    }
    return ({ success, error, payload })
}

function nestedLoop(props, payload) {
    
    for(let i=0;i<props.length;i++){
        let singlePath = props[i];
        for(let j=0;j<payload.length; j++){
            let lastPath = [...props]
            lastPath.splice(i, 1)
            console.log("Delete", lastPath, i , j)
           updateValue(payload[j], singlePath, lastPath);
        }
        
        

    }
}

function updateValue(payload, singlePath, lastPath){
    if(singlePath == "[]"){
        nestedLoop(lastPath, payload);
    }else if(lastPath.length>0){
        return nestedLoop(lastPath, payload);
    }else{
        console.log("Last", singlePath, get(payload, singlePath));
        return get(payload, singlePath);
    }
}

function valueReplace(data, pathParam, repalceAction=(v)=>{return v}){
    function nestedLoop(payload, path) {
      if(!payload){
        return;
      }
      if(path.split('.').length === 1 && !path.includes("[]")){
       
        let collected = get(payload, path);
        if (collected) {
          update(payload, path, repalceAction);
          return;
        }else{
          // return;
          throw new Error(`Not found exactly match path param for given payload.`)
        }
      }
      let singlePath = path.split(".");
      if (singlePath[0] == "[]") {
        if(Array.isArray(payload)){
          for (let i = 0; i < payload.length; i++) {
            let newPath = [...singlePath]
            newPath.shift();
            let stringPath = newPath.join(".");
            nestedLoop(payload[i], stringPath);
          }
        }else{
          throw new Error(`Path Parameter Wrong. First Path Param show in '${singlePath}' is not array.`)
        }
      } else {
        if (singlePath.length == 1) {
          let collected = get(payload, singlePath[0]);
          if (collected) {
            update(payload, singlePath[0], repalceAction)
          }else{
            throw new Error(`Not found exactly match path param for given payload.`)
          }
        } else {
          let newPath = [...singlePath]
          newPath.shift();
          let stringPath = newPath.join(".");
          nestedLoop(payload[singlePath[0]], stringPath);
        }
      }
    }
    nestedLoop(data, pathParam)
  }

function inputArrayFieldToDecrypt(arr, dynamicPathName) {
    map(arr, (obj) => {
        update(obj, dynamicPathName, (v) => {
            return decryption(v);
        })
        return obj;
    });
}

module.exports = response