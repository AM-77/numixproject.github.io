/*jslint browser: true, indent: 4, regexp: true*/
/*global $*/

(function () {
    'use strict';

    // Detect scroll position
    function detectScroll() {
        if ($(window).scrollTop() >= 1) {
            $(document.body).addClass("scrolled");
        } else {
            $(document.body).removeClass("scrolled");
        }
    }

    detectScroll();
    $(window).scroll(detectScroll);

    // Smooth scroll for in page links
    $("a[href*=#]:not([href=#])").click(function () {
        if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html,body").animate({
                    scrollTop: target.offset().top
                }, 500);
                return false;
            }
        }
    });

    // Display products
    $.getJSON('./res/data/projects.json', function(data) {
        var thumbdiv = '';
        $.each(data, function(j, g) {
            thumbdiv += '<h2 class="thumb-title">'+ j +'</h2>';
            $.each(g, function(i, f) {
                thumbdiv += '<a class="thumb" href="' + f.url + '">' +
                            '<img src="./res/img/thumbs/' + f.thumbnail + '" alt="' + i + '" />' +
                            '<span class="desc">' +
                            '<span class="name">' + i + '</span>' +
                            '<span class="more">' + f.price + '</span>' +
                            '</span>' +
                            '</a>';
            });
        });
        $(thumbdiv).appendTo(".artwork > .products");
    }).error(function() {
        var error = '<p>Something in the website broke, but don\'t worry, a team of hamsters is dispatched to fix it.</p>';
        $(error).appendTo(".artwork > .products");
    });

    // Make entire div clickable
    $(".thumb").click(function() {
        window.location=$(this).find("a").attr("href");
        return false;
    });

    // Display team members
    $.getJSON('./res/data/team.json', function (data) {
        var teamdiv = '';
        $.each(data, function (j, g) {
            teamdiv += '<a class="thumb" href="' + g.plusurl + '">' +
                       '<img src="./res/img/avatars/' + g.avatar + '" alt="' + g.fullname + '" />' +
                       '<span class="name">' + g.fullname + '</div>' +
                       '</a>';
        });
        $(teamdiv).appendTo(".about > .team");
    }).error(function () {
        var error = '<p>Something in the website broke, but don\'t worry, a team of hamsters is dispatched to fix it.</p>';
        $(error).appendTo(".about > .team");
    });

    // Show and hide the modal dialog
    function hideDialog() {
        $("body").removeClass("modal-open");
    }

    function showDialog() {
        if (history.pushState) {
            history.pushState(null, '');
        }

        $("body").addClass("modal-open").append("<div class='dim'></div>");
        $(".modal input[name=amount]").focus();

        $(".dim").on('click', function() {
            hideDialog();

            $(this).remove();
        });
    }

    function handleKey(e) {
        if (e.keyCode === 27) {
            hideDialog();
        }
    }

    $(window).keyup(handleKey);
    $(".modal").find("input").keyup(handleKey);

    $(window).on('popstate', hideDialog);

    $(".donate-button").click(showDialog);

    // Style active states in mobile
    document.addEventListener("touchstart", function () {}, true);

}());