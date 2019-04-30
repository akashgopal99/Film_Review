fetchMovies()

async function fetchMovies(){
    try{
        let response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=8a6754fd210705578904ddaef8d978e2&sort_by=popularity.desc');
        let body = await response.text();
        let parsedBody = JSON.parse(body);
        if(response.ok){
            for(let i = 0; i < parsedBody['results'].length; i ++){
                loadMovies(parsedBody['results'][i]['title']);
            };
            getMovies()
        }
    } catch(e){
        alert('Error: ' + e);
    }
};

async function getMovies(){
    try{
        let response = await fetch('http://127.0.0.1:8090/list');
        let body = await response.text();
        if(response.ok){
            let movies = JSON.parse(body);
            //document.getElementById('content').innerHTML= '<ul id="myUL">';
            for(let i = 0; i < movies.length; i ++){
                document.getElementById('content').innerHTML += '<li>' + movies[i] + '</li>';
            }
            //document.getElementById('content').innerHTML += '</ul>';
            appendClose();
        } else{
            document.getElementById('content').innerHTML = ' <br> List Of Movies Cannot Be Found';
        }
    } catch(e){
        alert('Error: ' + e);
    }
};

async function addMoviesForm(){
    event.preventDefault();
    if(document.getElementById('newMovie').value == ''){
        alert('Please Enter The Name Of The Movie')
    } else{
        try{
            let newMovie = document.getElementById('newMovie').value;
            let response = await fetch('http://127.0.01:8090/add',
                                        {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded'
                                        },
                                        body: 'movie_name=' + newMovie
                                        });
            if(!response.ok){
                throw new Error('Problem Whilst Adding New Movie' + response.code);
            } else{
                document.getElementById('newMovie').value = '';
                appendClose();
            }
        } catch (error) {
        alert ('Problem Whilst Adding New Movie: ' + error);
        }    
    }
};

async function loadMovies(movie_name){
    try{
        let response = await fetch('http://127.0.01:8090/add',
                                    {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    },
                                    body: 'movie_name=' + movie_name
                                    });
        if(!response.ok){
        throw new Error('Problem Whilst Adding New Movie' + response.code);
        }
    } catch (error) {
        alert ('Problem Whilst Adding New Movie: ' + error);
    }
};

function appendClose(){
    // Create a "close" button and append it to each list item
    var myNodelist = document.getElementsByTagName("LI");
    for (let i = 0; i < myNodelist.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    }
}