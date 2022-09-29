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
        console.log(this.id);
        let data = res_map[this.id];
        console.log(data);
        $(`body > .image_view img`).remove();
        $(`body > .image_view > .im_container > div`).remove();

//         $(`body > .image_view > .im_container`).append(`
// <div>
//     <div>
//         <iframe src="test_XR.58.html"
//                 allowfullscreen
//                 style="position: absolute; top: 0px; left: 0px; height: 100%; width: 1px; min-width: 100%; *width: 100%;"
//                 frameborder="0"
//                 scrolling="no">
//         </iframe>
//     </div>
// </div>`);

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
        document.getElementById('resume_chart_5').getContext('2d'),
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
    'res_ar_1': '/images/art/art-1.png',
    'res_ar_2': '/images/art/art-2.png',
    'res_ar_3': '/images/art/art-3.png',
    'res_pr_1': [
        '/images/projects/proj_1/slide_cover.png',
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
    ]
};