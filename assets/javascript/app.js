$(document).ready(function(){

    $('#house-gen-btn').on('click', function(){
        event.preventDefault();

        let houseNumber = Math.floor(Math.random() * 445);
        let url = 'https://anapioficeandfire.com/api/houses/' + houseNumber;

        $.ajax({
            url: url,
            method: "GET"
        }).then(function(response){
            $('#house').html(response.name);
            $('#region').html(response.region);

            if (response.words === ''){
                $('#words').html('This house has no words.')
            } else {
                $('#words').html(response.words);
            }
        });
    })
});