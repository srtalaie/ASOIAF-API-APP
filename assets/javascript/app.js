$(document).ready(function(){

    $('#house-gen-btn').on('click', function(){
        event.preventDefault();

        let houseNumber = Math.floor(Math.random() * 445);
        let url = 'https://anapioficeandfire.com/api/houses/' + houseNumber;

        $.ajax({
            url: url,
            method: "GET",
            success: function(res){
                let overLordHouseURL = res.overlord;
                $.ajax({
                    url: overLordHouseURL,
                    method: 'GET',
                    success: function(res){
                        let currentLordURL = res.currentLord
                        $.ajax({
                            url: currentLordURL,
                            method: 'GET',
                            success: function(res){
                                let heirURL = res.heir;
                                $.ajax({
                                    url: heirURL,
                                    method: 'GET',
                            }).then(function(res){
                                $('#heir').html(res.name);
                            });
                        }
                        }).then(function(res){
                            $('#current-lord').html(res.name);
                        });
                    }
                }).then(function(res){
                    $('#overlord').html(res.name);
                });
            }
        }).then(function(response){
            $('#house').html(response.name);
            $('#region').html(response.region);

            if (response.words === ''){
                $('#words').html('This house has no words.')
            } else {
                $('#words').html(response.words);
            }

            $('#titles').html(response.titles + ' ');

            $('#current-lord').html(response.currentLord);

            $('#seats').html(response.seats + ' ');

            $('#ancestral-weapons').html(response.ancestralWeapons);
        });
    });
});