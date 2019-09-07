const searchesTemplate = Handlebars.compile(
    document.getElementById('searches-template').innerHTML
  );

  Handlebars.registerHelper('format', function(subscribers){
    return subscribers.toLocaleString();
  });

var $loading = $('#loader').hide();
$(document)
.ajaxStart(function () {
    $loading.show();
  })
  .ajaxStop(function () {
    $loading.hide();
  });
  
$('#searchForm').submit(function(event){
    event.preventDefault();
    $('#results').html('Loading...');
    
    try {
        var searchTerm = $('#searchItem').val();
        let searches = $.ajax({
            type: 'GET',
            url: 'https://www.reddit.com/r/subreddits/search.json',
            data: {q: searchTerm},
            beforeSend: function(){
                $('#loader').show();
            },
            complete: function(){
                $('#loader').hide();
            }
        }).then(function(responseData){
            let searches = responseData.data.children;
            let sanitizedHtml = searchesTemplate({searches});
            $('#results').html(sanitizedHtml);
        });


    } catch (error) {
        $('#results').html('something wrong');
    }



    // promise.then(function(responseData) {
        
    //     let fragment = document.createDocumentFragment();
    //     let html = '';
    //     $.each(responseData.data.children, function(idx, searchResult){
    //         let div = document.createElement('div');
    //         let a = document.createElement('a');
    //         let p = document.createElement('p');
    //         let p1 = document.createElement('p');

    //         a.innerText = 'Title: ' + searchResult.data.title;
    //         a.href = searchResult.data.url;
    //         a.target = "_blank";
    //         p.innerText = 'Author: ' + searchResult.data.author;
    //         p1.innerText = 'Score: ' + searchResult.data.score;

    //         div.append(a);
    //         div.append(p);
    //         div.append(p1);
    //         fragment.append(div);
    //     });
        
    //     $('#results').html(fragment);    
    // });
});


