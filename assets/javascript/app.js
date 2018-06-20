$(document).ready(function(){

    $('#house-gen-btn').on('click', function(){
        event.preventDefault();

        let houseNumber = Math.floor(Math.random() * 445);
        let url = 'https://anapioficeandfire.com/api/houses/' + houseNumber;
        console.log(houseNumber);

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

            $('#titles').html(response.titles);

            $('#current-lord').html(response.currentLord);

            $('#heir').html(response.heir);

            $('#overlord').html(response.overlord);

            console.log(getPeople(response.overlord));

            function getPeople(personUrl){
                $.ajax({
                    url: personUrl,
                    method: 'GET'
                }).then(function(res){
                    return res.name;
                    console.log(res.name);
                });
            }
        });
    })
});