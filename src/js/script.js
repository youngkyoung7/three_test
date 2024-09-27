$(document).ready(function(){
//.shoesColor>li클릭했을때->$(대상).on("click",function(){})
//1..content_wrap안에 있는 자식요소인 img가 보여야함(show())
//다른 형제 요소는 보이지않아야함(hide())
//let i = $(this).index()

$('.shoesColor>li').on('click',function(e){
    e.preventDefault();//a링크를 막을수 있음.

    let i = $(this).index()
    $('.content_wrap').children('img').eq(i).show()
    .siblings().hide()
    //2. .btn_warp안에 있는 자식요소인 div가 보여함,그리고 형제요소는 보이지 않아야함
    $('.btn_warp').children('div').eq(i).show()
    .siblings().hide()
    //3. left에 배경색이 변경되어야함

    if(i == 0){
        $('.left').css({'backgroundColor' : '#4882d2'})//파란색
    }else{
        $('.left').css({'backgroundColor' : '#305e44'})//그린
    }
    //4. addClass를 이용하여 클릭한 li는 on을 달고
    //형제요소들은 removeClass를 이용하기
    $(this).addClass('on').siblings().removeClass('on')


})//클릭이벤트

var tl = gsap.timeline();
tl.to(".title", { y: -100, duration: 1 });
tl.from('.btn_warp',{ y: 100, duration: 1,opacity: 0 })
tl.from(".content_wrap",{ x: 100, y: 100,duration: 1,opacity: 0 })
tl.from(".shoesColor",{ x: 100,y: 100, duration: 1,opacity: 0 })
})//document