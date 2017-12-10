function generateShotUrl(longUrl){
	
  $.ajax({
    url: '/api/shorten',
    type: 'POST',
    dataType: 'JSON',
    data: {url: longUrl.value},
    success: function(data){
        
        var resultHTML = '<a class="result" href="' + data.shortUrl + '">'
            + data.shortUrl + '</a>';
       $('#shortUrl').html(resultHTML);
    }
  });
}