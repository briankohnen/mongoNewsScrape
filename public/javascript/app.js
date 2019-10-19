$(document).ready(function() {

    $('#scrape').on('click', function() {
        $.ajax({
            method: 'GET',
            url: '/scrape'
        }).then(function() {
            render();
        });
    });

    const render = () => {
        location.reload();
    };

    $('.addArticle').on('click', function() {
        let articleID = $(this).attr('data-id');
        $(this).parent().hide();
        $.ajax({
            method: 'PUT',
            url: '/articles/' + articleID + '/save'
        });
    });

    $('.deleteArticle').on('click', function() {
        let articleID = $(this).attr('data-id');
        $(this).parent().hide();
        $.ajax({
            method: 'DELETE',
            url: '/articles/' + articleID + '/delete'
        });
    });

    $('.comment').on('click', function() {
        let articleID = $(this).attr('data-id');
        $('#commentModal').show();
    });

    $('#clearSaved').on('click', function() {
        $.ajax({
            method: 'DELETE',
            url: '/articles/saved'
        });
    });

    $('#clear').on('click', function() {
        $.ajax({
            method: 'DELETE',
            url: '/articles'
        });
    });

});