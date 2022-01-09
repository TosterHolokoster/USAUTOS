let header = { 
    link : $("#m-top"),
    offset : 0
}
let services = { 
    link : $("#m-service"),
    offset : -1
}
let stock = { 
    link : $("#m-stock"),
    offset : -1
}
let aboutUs = { 
    link : $("#m-company"),
    offset : -1
}
let feedback = { 
    link : $("#m-feedback"),
    offset : -1
}
let contacts = { 
    link : $("#m-contacts"),
    offset : -1
}

$(document).ready(function(){
    GetOffset();
    CheckOffset();

    $(window).resize(GetOffset);
    $(document).scroll(CheckOffset);

    $("#maintenance").hover(function(){
        $("#maintenance > img").attr("src", "resources/img/ico_gear_active.png");
    }, function(){
        $("#maintenance > img").attr("src", "resources/img/ico_gear.png");
    });

    $("#fitting").hover(function(){
        $("#fitting > img").attr("src", "resources/img/ico_tires_active.png");
    }, function(){
        $("#fitting > img").attr("src", "resources/img/ico_tires.png");
    });

    $("#sign-up, #consultation, #more-services, #fitting").click(function(){
        ScrollTo($("#form").offset().top, 1500);
    });
    $("#maintenance").click(function(){
        ScrollTo(0, 1000);
    });

    $(".munu-item").click(function(){
        let item = $(this);
        switch(item.attr("id")){
            case header.link.attr("id"):
                ScrollTo(header.offset);
                break;
            case services.link.attr("id"):
                ScrollTo(services.offset);
                break;
            case stock.link.attr("id"):
                ScrollTo(stock.offset);
                break;
            case aboutUs.link.attr("id"):
                ScrollTo(aboutUs.offset);
                break;
            case feedback.link.attr("id"):
                ScrollTo(feedback.offset);
                break;
            case contacts.link.attr("id"):
                ScrollTo(contacts.offset);
                break;
        }
    });


    $(".gallery-item").click(function(){
        $("#autoservice-photos").prepend('<div id="fullsize"><img src="' + $(this).attr("src") + '"></div>');
        $("#fullsize").click(function(){
            $(this).remove();
        });
    });

    $("#photo-board > div").click(function(){
        ChangePerson($(this).attr("name"));
    });

    $("#photo-forward").click(function(){
        ChangePerson(parseInt($("#photo > img").attr("name")) + 1);
    });
    $("#photo-backward").click(function(){
        ChangePerson(parseInt($("#photo > img").attr("name")) - 1);
    });
    
    $("#partners-forward").click(function(){
        ScrollSlider(200);
    });
    $("#partners-backward").click(function(){
        ScrollSlider(-200);
    });
});

function ScrollSlider(offset){
    let slider = $("#partners-slider");
    let pos = slider.scrollLeft() + offset;
    slider.animate({scrollLeft: pos}, 350);
}

function ChangePerson(num){
    $(".person").each(function(){
        if( $(this).attr("name") == num){
            $(".p-visible").removeClass("p-visible");
            $(this).addClass("p-visible");
            $("#photo > img").attr({
                "src": "resources/img/person_" + num +".jpg", 
                "name": num
            });
        }
    });
}

function ScrollTo(offset, time = 500){
    let body = $('html, body');
    if(body.scrollTop() != offset)
        body.animate({scrollTop: offset}, time);
}

function CheckOffset(){
    let offset = $(document).scrollTop();
    if(offset >= aboutUs.offset){
        if(offset >= feedback.offset){
            if(offset >= contacts.offset){
                SetActive(contacts.link);
            }
            else
                SetActive(feedback.link);
        }
        else
            SetActive(aboutUs.link);
    } 
    else{
        if(offset >= services.offset){
            if(offset >= stock.offset){
                SetActive(stock.link);
            }
            else
                SetActive(services.link);
        }
        else
            SetActive(header.link);
    }
}

function GetOffset(){
    services.offset = $("#services").offset().top - 122;
    stock.offset = $("#stock").offset().top  - 122;
    aboutUs.offset = $("#about-us").offset().top - 122;
    feedback.offset = $("#feedback").offset().top - 122;
    contacts.offset = $("#contacts").offset().top - 122;
}

function SetActive(id){
    $("#menu .active").removeClass("active");
    id.addClass("active");
}