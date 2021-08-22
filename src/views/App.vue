<template>
    <div id="app">
        <div>解析Vue文件了哟~</div>
        <p>{{name}}</p>
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
   name: 'app',
   data() {
       return {
           name: 'zhangsan'
       }
   }
})
</script>


