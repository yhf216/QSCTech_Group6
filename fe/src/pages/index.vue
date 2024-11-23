<template>
      <div class="content center">
        <div class="header center">
            <ul class="nav">
              <button><li>Host</li></button>
              <button @click="click_exam()"><li>Exam</li></button>
              <button @click="click_compete()"><li>Compete</li></button>
            </ul>
            <span class="login iconfont icon-login" @click="click_login()">
            </span>
          </div>
      </div>
      <div class="welcome"> 
        <div class="typewriter">Welcome to QSC Team 6</div>
      </div>
</template>
<script setup>
  import '../assets/login_home/iconfont.css'
  import { useRouter } from 'vue-router';

  const router = useRouter();
  function click_exam(){
    router.push('/exam/start')
  }

  function click_compete(){
    router.push('/compete')
  }

  function click_login(){
    router.push('/user/signxx')
  }

</script>

<style scoped>
  html,p,h1,h2,h3,h4,h5,h6,ul,ol,li{margin:0;padding:0;overflow: hidden;}
  a{text-decoration: none;}
  ul,ol{list-style: none}
  input{ outline: none;}
                 
  /* 块级水平居中 */
  .center{
      min-width: 1260px;
      margin: 0 auto;
      width: 1260px;
      height: 50px;
  }

  .content{
      border-bottom: 1px solid #191414 ;
      width: 100%;
      height: 100%;
      background-image:linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('../assets/tech.jpg') ;
      background-size: 100%;
      background-repeat: no-repeat; /* 防止图片重复 */
      background-position: center;
  }
  /* 导航栏设置 */
  .header{
      display: flex;
      justify-content: space-between;
      line-height: 50px;

  }
  /* 图标 */

  /* 导航分块 */
  .header .nav{
      color: aliceblue;
      font-size: 20px;
      font-weight: 800;
      width: 80%;
      display: flex;
      height: 100%;
  }
  /* 分块设置 */
  .header .nav li{
      
      cursor: pointer;
      margin-left: 18px;
      /* 不允许复制 */
      user-select: none;
  }

  .header .nav li:hover{
      color: aqua;
  }

  /* 登陆图标 */
  .header .login{
      font-size: 30px;
      cursor: pointer;
      color: rgb(249, 249, 250);
  }

  .header .login:hover{
      color: aqua;
  }


  /* 欢迎页面 */
  .welcome{
    width: 600px;
    height: 30px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto ;
    font-size: 50px;
    text-align: center;
  }
  /* 设置打字机外观 */
  .typewriter {
    font-family: 'Courier New', Courier, monospace; /* 打字机风格字体 */
    display: inline-block;
    white-space: nowrap; /* 防止文字换行 */
    overflow: hidden; /* 隐藏未展示的文字 */
    border-right: 2px solid black; /* 模拟光标 */
    animation: typing 4s steps(30, end), blink 0.6s step-end infinite;
  }

  /* 打字机动画 */
  @keyframes typing {
    from {
      width: 0; /* 从 0 宽度开始 */
    }
    to {
      width: 100%; /* 展示完整文字 */
    }
  }

  /* 光标闪烁效果 */
  @keyframes blink {
    from, to {
      border-color: transparent;
    }
    50% {
      border-color: black;
    }
  }


</style>