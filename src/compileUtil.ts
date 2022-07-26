export default class CompileUtil {

    static updater = {
        textUpdater: function(node, value) {
            node.textContent = typeof value == 'undefined' ? '' : value;
        },
    
        htmlUpdater: function(node, value) {
            node.innerHTML = typeof value == 'undefined' ? '' : value;
        },
    
        classUpdater: function(node, value, oldValue) {
            var className = node.className;
            className = className.replace(oldValue, '').replace(/\s$/, '');
    
            var space = className && String(value) ? ' ' : '';
    
            node.className = className + space + value;
        },
    
        modelUpdater: function(node, value, oldValue) {
            if (oldValue===null) oldValue==null;
            node.value = typeof value == 'undefined' ? '' : value;
        }
    }

    constructor(){}

    static text(node, vm, exp) {
        CompileUtil.bind(node, vm, exp, 'text');
    }

    static html(node, vm, exp) {
        CompileUtil.bind(node, vm, exp, "model");
    }

    static model(node, vm, exp) {
        CompileUtil.bind(node, vm, exp, 'html');
        let val = this._getVMVal(vm, exp);
        node.addEventListener('input', (e)=>{
            var newValue = e.target.value;
            if (val===newValue) return;
            this._setVMVal(vm, exp, newValue);
            val = newValue;
        })
    }

    static class(node, vm, exp){
        CompileUtil.bind(node, vm, exp, 'class');
    }

    static bind(node, vm, exp, dir) {
        let updaterfn = CompileUtil.updater[dir + 'Updater'];
        updaterfn && updaterfn(node, CompileUtil._getVMVal(vm, exp));

        console.log("TODO: finish the bind");
    } 

    static eventHandler(node, vm, exp, dir) {
        let eventType = dir.split(':')[1];
        let fn = vm.$options.methods && vm.$options.methods[exp];
        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    }

    static _getVMVal(vm, exp) {
        let val = vm;
        exp = exp.split('.');
        exp.forEach(k=>{
            val = val[k];
        })
        return val;
    }

    static _setVMVal(vm, exp, value) {
        let val = vm;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
}