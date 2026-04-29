document.getElementById('searchTextField').addEventListener('keypress', myfunction);

function myfunction() {
    const search = 'https://serpapi.com/search.json?q=Coffee&location=Austin,+Texas,+United+States&hl=en&gl=us&google_domain=google.com&api_key=e468c763dae6729baf1ff16db0321948cc886375983adc7bed738af321c34d98';

    var sendingData = {
        name: "Odinfono Emmanuel",
        phone: "1234567890"
    }
    
    $.ajax({
        url: search,
        method: 'POST',
        type: 'json',
        data: sendingData,
        success: function (response) {
            console.log(response);
        },
        error: function (error) {
            console.log(error);
        }
    });
}