$(document).ready(function(){

    $('#house-gen-btn').on('click', function(){
        event.preventDefault();

        clearHTML();

        //Set url to a random house number provided by the api
        let houseNumber = Math.floor(Math.random() * 445);
        let url = 'https://anapioficeandfire.com/api/houses/' + houseNumber;

        //Gets house info that is accessible to that house's object in the api
        //Current Over Lord House needs a separate API call to get its name otherwise it just returns
        //the url for that house
        $.ajax({
            url: url,
            method: "GET",
            success: function(res){
                let overLordHouseURL = res.overlord;
                $.ajax({
                    url: overLordHouseURL,
                    method: 'GET',
                }).then(function(res){
                    $('#overlord').html(res.name);
                });
            }
        }).then(function(response){
            $('#house').html(response.name);
            $('#region').html(response.region);

            if (response.words === ''){
                $('#words').html('Words are Wind')
            } else {
                $('#words').html(response.words);
            }

            for (let j = 0; j < response.titles.length; j++){
                if (response.titles[j] != ''){
                    $('#titles').html(response.titles[j] + ' ');
                } else {
                    $('#titles').html('This House has no Titles');
                }
            }
            
            
            for (let i = 0; i < response.seats.length; i++){
                if (response.seats[i] != ''){
                    $('#seats').html(response.seats[i] + ' ');;
                } else {
                    $('#seats').html('This House holds no Seats');
                }
            }
            
            for (let k = 0; k < response.seats.length; k++){
                if (response.ancestralWeapons[k] != ''){
                    $('#ancestral-weapons').html(response.ancestralWeapons[k], + ' ');
                } else {
                    $('#ancestral-weapons').html('This House has no Ancestral Weapons');
                }
            }
        });

        //Same issue as before, the current lord only returns a URL so a separate API call needs to be
        //made to return the lord's name
        $.ajax({
            url: url,
            method: 'GET',
            success: function(res2){
                let currentLordURL = res2.currentLord;

                if(currentLordURL){
                    $.ajax({
                        url: currentLordURL,
                        method: 'GET'
                    }).then(function(response){
                        $('#current-lord').html(response.name);
                    });
                } else {
                    $('#current-lord').html('This House has no Current Lord');
                }
            }
        });

        //Get a list of sworn member's names
        $.ajax({
            url: url,
            method: 'GET',
            success: function(res3){
                for (let x = 0; x < res3.swornMembers.length; x++){
                    let swornMembersURL = res3.swornMembers[x];
                    $.ajax({
                        url: swornMembersURL,
                        method: 'GET'
                    }).then(function(response){
                        $('#sworn-members-list').html(`<li>${response.name}</li>`);
                    });
                }
            }
        });

        //Get heir's name
        $.ajax({
            url: url,
            method: 'GET',
            success: function(res4){
                let heirURL = res4.heir;
                if (heirURL){
                    $.ajax({
                        url: heirURL,
                        method: 'GET'
                    }).then(function(response){
                        $('#heir').html(response.name);
                    });
                } else {
                    $('#heir').html('This House has no Heirs');
                }
            }
        });

        //Get list of cadet branches
        $.ajax({
            url: url,
            method: 'GET',
            success: function(res5){
                for (let x = 0; x < res5.cadetBranches.length; x++){
                    let cadetBranchesURL = res5.cadetBranches[x];
                    $.ajax({
                        url: cadetBranchesURL,
                        method: 'GET'
                    }).then(function(response){
                        $('#cadet-branches-list').html(`<li>${response.name}</li>`);
                    });
                }
            }
        });

    });

    //Function to clear out HTML when a new request is made
    function clearHTML(){
        $('#cadet-branches-list').html('');
        $('#heir').html('');
        $('#sworn-members-list').html('');
        $('#current-lord').html('');
        $('#ancestral-weapons').html('');
        $('#seats').html('');
        $('#titles').html('');
        $('#words').html('');
        $('#house').html('');
        $('#region').html('');
        $('#overlord').html('');
    }
});