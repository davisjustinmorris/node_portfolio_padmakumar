// const THREE = require('three');
let fl_nm = "solenoid_valve_12v_dc-1.obj";

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
        $(`body > .image_view img`).remove();

        if (typeof data === 'string')
            $(`body > .image_view > .im_container`).append(`<img src="${data}" alt="Image Showcase"/>`);
        else {
            data.forEach(function (e) {
                $(`body > .image_view > .im_container`).append(`<img src="${e}" alt="Image Showcase"/>`);
            });
        }

        $(`body > .image_view`).show();
    });

    let chart_1 = new Chart(
        document.getElementById('resume_chart_1').getContext('2d'),
        {type: "doughnut", data: {datasets: [{data: [80, 20], backgroundColor: ['rgb(240, 182, 99)', 'rgb(200, 200, 200)']}]}}
    );
    let chart_2 = new Chart(
        document.getElementById('resume_chart_2').getContext('2d'),
        {type: "doughnut", data: {datasets: [{data: [65, 35], backgroundColor: ['rgb(216, 106, 108)', 'rgb(200, 200, 200)']}]}}
    );
    let chart_3 = new Chart(
        document.getElementById('resume_chart_3').getContext('2d'),
        {type: "doughnut", data: {datasets: [{data: [20, 80], backgroundColor: ['rgb(95, 183, 157)', 'rgb(200, 200, 200)']}]}}
    );
    let chart_4 = new Chart(
        document.getElementById('resume_chart_4').getContext('2d'),
        {type: "doughnut", data: {datasets: [{data: [70, 30], backgroundColor: ['rgb(94, 139, 187)', 'rgb(200, 200, 200)']}]}}
    );
    let chart_6 = new Chart(
        document.getElementById('resume_chart_6').getContext('2d'),
        {type: "doughnut", data: {datasets: [{data: [70, 30], backgroundColor: ['rgb(117, 175, 125)', 'rgb(200, 200, 200)']}]}}
    );
});

let res_map = {
    'res_ib_1': '/images/image_board/1.jpg',
    'res_ib_2': '/images/image_board/2.jpg',
    'res_ib_3': '/images/image_board/3.jpg',
    'res_ib_5': '/images/image_board/5.jpg',
    'res_ib_9': '/images/image_board/9.jpg',
    'res_ib_10': '/images/image_board/10.jpg',
    'res_ar_1': '/images/art/art_1.jpg',
    'res_ar_2': '/images/art/art_2.jpg',
    'res_pr_1': [
        '/images/projects/pr_1_1.jpg',
        '/images/projects/pr_1_2.jpg',
        '/images/projects/pr_1_3.jpg',
        '/images/projects/pr_1_4.jpg',
        '/images/projects/pr_1_5.jpg',
        '/images/projects/pr_1_6.jpg',
        '/images/projects/pr_1_7.jpg'
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