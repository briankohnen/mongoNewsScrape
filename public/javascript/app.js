$(document).ready(function() {

    $('#scrape').on('click', function() {
        $.ajax({
            method: 'GET',
            url: '/scrape',
        });
    });

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

    $('.commentArticle').on('click', function() {
        let articleID = $(this).attr('data-id');
        let articleTitle = $(this).parent().find('p.articleHead').text();
        $('#modalHeader').text(articleTitle);
        $('#commentModal').attr('data-id', articleID);
        refreshModal();
    });

    $('#sendComment').on('click', function() {
        event.preventDefault();

        let comment = {
            body: $("#body").val().trim()
        }

        $.ajax({
            method: 'POST',
            url: '/articles/' + $('#commentModal').attr('data-id'),
            data: comment,
            success: function () {
                refreshModal();
            }
        });

        $('#body').val('');
    });

    const refreshModal = () => {
        $('#commentModal').show();
        $.ajax({
            method: 'GET',
            url: '/articles/' + $('#commentModal').attr('data-id'),
            success: function(data) {
                showComments(data)
            }
        });
    };

    const showComments = (data) => {
        $('#allComments').empty();
        data.comment.forEach(comm => {
            let commentLI = $('<li>').addClass('listComment');
            commentLI.text(comm.body);
            let deleteComment = $('<button>').addClass('deleteComment');
            deleteComment.attr('data-id', comm._id);
            deleteComment.text('X');
            commentLI.append(deleteComment);
            $('#allComments').append(commentLI);
        });
    };

    $(document).on('click', '.deleteComment', function() {
        $(this).hide();
        $.ajax({
            method: 'DELETE',
            url: '/articles/deletecomment/' + $(this).attr('data-id'),
            success: function () {
                refreshModal();
            }
        });
    });

    $('.close').on('click', function() {
        $('#commentModal').hide();
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