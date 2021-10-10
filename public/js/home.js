// let fl_nm = "solenoid_valve_12v_dc-1.obj";

$(document).ready(function () {
    $(`body > main > aside > nav > ul > li`).on('click', function () {
        $(`.section_target`).removeClass('active');
        $('body main aside nav li').removeClass('active');
        $(`body main > section > article`).removeClass('active');

        let name = $(this).addClass('active').find('span').html();

        console.log(name);
        $(`#${name}, .section_target.${name}`).addClass('active');
        history.pushState("", "", "/"+name);
        $('#internal_nav_selection').val(name);
    });

    let mapper = {
        'about': 1,
        'resume': 2,
        'portfolio': 3,
        'contact': 4
    }
    // show internal_nav_selected element by firing a click to the on_click nav element
    let int_nav_sel_index = mapper[$('#internal_nav_selection').val()];
    $(`body > main > aside > nav > ul > li:nth-child(${int_nav_sel_index})`).click();

    $(`#card button`).on('click', function () {
        $(`body main aside nav li:last-child`).trigger('click');
    });

    $(`nav.section_target.portfolio li`).on('click', function () {
        $(`nav.section_target.portfolio li`).removeClass('active');
        $(`#portfolio >section`).removeClass('active');

        let name = this.classList[0];
        $(this).addClass('active');
        $(`#portfolio >section.${name}`).addClass('active');
    });

    $(`body > .image_view span`).on('click', function () {
        $(`body > .image_view`).hide();
    })
    $(`#portfolio > section .frame`).on('click', function () {
        let data = res_map[this.id];
        $(`body > .image_view > .im_container :not(span.close)`).remove();
        $(`body > .image_view > .desc`).remove();

        if (typeof data === 'string')
            $(`body > .image_view > .im_container`).append(`<img src="${data}" alt="Image Showcase"/>`);
        else if (Array.isArray(data)) {
            data.forEach(function (e) {
                $(`body > .image_view > .im_container`).append(`<img src="${e}" alt="Image Showcase"/>`);
            });
        } else {
            $(`body > .image_view > .im_container`).append(`<img src="${data.url}" alt="Image Showcase"/>`);
            $(`body > .image_view`).append(`<div class="desc"></div>`);
            for (const [key, value] of Object.entries(data.desc)) {
                $(`body > .image_view > div.desc`).append(`<div><span>${key}: </span><span>${value}</span></div>`);
            }
        }

        $(`body > .image_view`).show();
    });

    let chart_data = [
        [[80, 20], ['rgb(240, 182, 99)', 'rgb(200, 200, 200)']],
        [[65, 35], ['rgb(216, 106, 108)', 'rgb(200, 200, 200)']],
        [[20, 80], ['rgb(95, 183, 157)', 'rgb(200, 200, 200)']],
        [[70, 30], ['rgb(94, 139, 187)', 'rgb(200, 200, 200)']],
        [[70, 30], ['rgb(117, 175, 125)', 'rgb(200, 200, 200)']]
    ]
    for (let i=1; i<=chart_data.length; i++){
        let elm = document.getElementById('resume_chart_'+(i).toString()).getContext('2d');
        new Chart(elm, {
            type: "doughnut",
            data: {datasets: [{data: chart_data[i-1][0], backgroundColor: chart_data[i-1][1]}]}
        })
    }

    $(`article#contact > button`).on('click', function () {
        let first_name = $(`article#contact input[name='first_name']`).val();
        let last_name = $(`article#contact input[name='last_name']`).val();
        let sender_email = $(`article#contact input[name='email']`).val();
        let sender_message = $(`article#contact textarea[name='message']`).val();

        // validate email
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(sender_email)) {
            alert('The given email id seems to be invalid. Please try again with a different one.');
            return;
        }

        // confirm if empty message text box should be sent
        if (sender_message.length === 0) {
            if (!confirm('Are you sure you want to send the message with an empty text?'))
                return;
        }

        if (!flag_captcha) {
            alert('verify the captcha and try again');
            return;
        }

        $(`article#contact > button`).prop('disabled', true);

        let post_data = {first_name, last_name, sender_email, sender_message};
        console.log('sending post data: ', post_data)

        $.ajax({
            url: '/mail_forward',
            type: "POST",
            data: JSON.stringify(post_data),
            contentType: 'application/json',
            dataType: 'text',
            success: function (data, status, xhr){
                console.log('response: data, status, xhr');
                console.log(data, status, xhr);
                $(`article#contact input, article#contact textarea`).val("");
            },
            error: function (a, b) {
                console.log("ajax error");
                console.log(a, b);
            },
            complete: function() {
                $(`article#contact > button`).prop('disabled', false);
            }
        });
    });
});

let res_map = {
    'res_ib_1': '/images/image_board/1.jpg',
    'res_ib_2': '/images/image_board/2.jpg',
    'res_ib_3': '/images/image_board/3.jpg',
    'res_ib_5': '/images/image_board/5.jpg',
    'res_ib_9': '/images/image_board/9.jpg',
    'res_ib_10': '/images/image_board/10.jpg',
    'res_ar_1': {
        url: '/images/art/new-1.png',
        desc: {
            Subject : "Model",
            Medium  : "Toned paper/ Graphite pencil",
            Date    : "28 September 2021"
        }
    },
    'res_ar_2': {
        url: '/images/art/new-2.png',
        desc: {
            Subject : "Native American Indian",
            Medium  : "Toned paper/ Graphite pencil",
            Date    : "22 September 2021"
        }
    },
    'res_ar_3': {
        url: '/images/art/old-1.png',
        desc: {
            Subject : "Abraham Lincoln",
            Medium  : "Toned paper/ Graphite pencil",
            Date    : "28 April 2020"
        }
    },
    'res_ar_4': {
        url: '/images/art/old-2.png',
        desc: {
            Subject : "Model",
            Medium  : "Toned paper/ Graphite pencil",
            Date    : "08 June 2020"
        }
    },
    'res_pr_1': [
        '/images/projects/proj_1/TEMP_COVER_SLIDE.jpg',
        '/images/projects/proj_1/slide1.png',
        '/images/projects/proj_1/slide2.png',
        '/images/projects/proj_1/slide3.png',
        '/images/projects/proj_1/slide4.png',
        '/images/projects/proj_1/slide5.png',
        '/images/projects/proj_1/slide6.png',
        '/images/projects/proj_1/slide7.png',
        '/images/projects/proj_1/slide8.png',
        '/images/projects/proj_1/slide9.png',
        '/images/projects/proj_1/slide10.png',
        '/images/projects/proj_1/slide11.png',
        '/images/projects/proj_1/slide12.png',
        '/images/projects/proj_1/slide13.png',
        '/images/projects/proj_1/slide14.png',
        '/images/projects/proj_1/slide15.png',
        '/images/projects/proj_1/slide16.png',
        '/images/projects/proj_1/slide17.png',
        '/images/projects/proj_1/slide18.png',
        '/images/projects/proj_1/slide19.png',
        '/images/projects/proj_1/slide20.png',
        '/images/projects/proj_1/slide21.png',
        '/images/projects/proj_1/slide22.png',
        '/images/projects/proj_1/slide23.png',
    ],
    'res_pr_2': [
        '/images/projects/pr_2.jpg',
        '/images/projects/pr_1_2.jpg',
        '/images/projects/pr_1_3.jpg',
        '/images/projects/pr_1_4.jpg',
        '/images/projects/pr_1_5.jpg',
        '/images/projects/pr_1_6.jpg',
        '/images/projects/pr_1_7.jpg'
    ]
};