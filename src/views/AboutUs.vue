<template>

    <div class="BoxAbout row">

        <div class="col-lg-6 col-12 row">
            <div class="col-12 row align-items-center justify-content-center">

                <img src="../assets/Image/my.jpg" alt="Abolfazl Jamshidi">

            </div>
        </div>

        <div class="col-lg-6 col-12 row  ">

            <h1 class="col-12 mt-5 text-center">Abolfazl Jamshidi</h1>

            <ul class="col-12 align-item-center text-center">
                <li>FrontEnd Developer Website</li>
                <li>Team : <a href="http://exPersian.ir" target="_blank">exPersian</a></li>
                <li>Project : <router-link to="/">Calculator</router-link></li>
            </ul>

            <div class="contact row col-12 justify-content-center">
                <a href="https://t.me/Abolfazljamshidi10" target="_blank"><i class="fa-brands fa-telegram"></i></a>
                <a href="https://github.com/Abolfazlabolfazljamshidi" target="_blank"><i class="fa-brands fa-github"></i></a>
                <a href="https://www.linkedin.com/in/abolfazl-jamshidi-007359233/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3Bs0dkDQjOQMa80Al3f2iQfA%3D%3D" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                <a href="http://AbolfazlJamshidi101010@gmail.com" target="_blank"><i class="fa-solid fa-envelope-open"></i></a>
            </div>

        </div>

    </div>

</template>





<style scoped>

.BoxAbout{
    height: 100vh;
    direction: ltr;
}
img {
    width: 500px;
    border-radius: 50%;
}
i {
    font-size: 50px;
    margin: 10px;
}
ul{
    font-size: 20px;
}
li{
    list-style: none;
}
.contact{
    height: 100px;
}
.fa-telegram{
    color: #229ED9;
}
.fa-envelope-open{
    color: #625e5e;
}
.fa-github{
    color: #353131;
}
.fa-linkedin{
    color: #005e8b
}


@media (min-width:1000px) and (Max-Width:1230px) {
    img{
        width: 400px;
    }
}
@media (min-width:0) and (Max-Width:590px) {
    img{
        width: 300px;
    }
}

</style>