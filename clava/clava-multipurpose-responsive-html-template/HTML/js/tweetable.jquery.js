(function($) {
	
	jQuery.fn.tweetable = function (opts) {
		opts = $.extend({}, $.fn.tweetable.options, opts);
		
		return this.each(function () {

			var act = jQuery(this)
			,   tweet_list = jQuery('<ul class="tweet_list">')[opts.position.toLowerCase() + 'To'](act)
			,   shortMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
			,	api = "http://api.getmytweets.co.uk/?screenname="
			,   limitcount = "&limit="
			,	callback = "&callback=?"
			,   twitterError
			,   tweetMonth
			,   tweetMonthInt
			,   iterate
			,   element;

			// Show a loading message
			tweet_list.append('<p id="tweet_loader">'+ opts.loading +'</p>');

			// Fire JSON request to twitter API
			jQuery.getJSON(api + opts.username + limitcount + opts.limit).done(function(data) 
			{
				// Hide the tweet loader in favour of the response
				jQuery("#tweet_loader").remove();

				// Check for response error 
				twitterError = data && data.error || null;

				if(twitterError)
				{
					tweet_list.append('<li class="tweet_content item"><i class="fa fa-twitter"></i><p class="tweet_link">'+ opts.failed +'</p></li>');
					return;
				}

				// Loop through twitter API response
				jQuery.each(data.tweets, function (i, tweet) {

					// Output tweets if less than limit
					if(i >= opts.limit)
						return;

					tweet_list.append('<li class="tweet_content_' + i + '"><i class="fa fa-twitter"></i><p class="tweet_link_' + i + '">' + tweet.response.replace(/#(.*?)(\s|$)/g, '<span class="hash">#$1 </span>').replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<a href="$&">$&</a> ').replace(/@(.*?)(\s|\(|\)|$)/g, '<a href="http://twitter.com/$1">@$1 </a>$2').replace(/:">/, ' ">').replace(/: <\/a>/, '</a>:') + '</p></li>');
					
					// Display the time of tweet if required
					if (opts.time === true) {
						for(iterate=0; iterate<=12; iterate++) {
							if(shortMonths[iterate] === tweet.tweet_date.substr(4, 3)) {
								tweetMonthInt = iterate + 1;
								tweetMonth = (tweetMonthInt < 10) ? '0' + tweetMonthInt : tweetMonthInt ;
							}
						}
						// Create ISO 8601 formatted date
						var iso8601 = tweet.tweet_date.substr(26,4) + '-' + tweetMonth + '-' + tweet.tweet_date.substr(8, 2) + 'T' + tweet.tweet_date.substr(11,8) + 'Z';  
						jQuery('.tweet_link_' + i).append('<p class="timestamp"><'
							+ ((opts.html5) ? 'time datetime="' + iso8601 + '"' : 'small') 
							+ '> ' + tweet.tweet_date.substr(8, 2) + '/' + tweetMonth + '/' + tweet.tweet_date.substr(26,4) + ', ' + tweet.tweet_date.substr(11,5) + '</' 
							+ ((opts.html5) ? 'time' : 'small') + 
							'></p>');
					}
				});

				// Display one tweet and retweet
				if ( opts.rotate === true ) {

					var listItem = tweet_list.find('li')
					,   listLength = listItem.length || null
					,   current = 0
					,   timeout = opts.speed;	

					if(!listLength)
						return

					// Rotate the tweets one at a time
					function rotateTweets() {
					   listItem.eq(current++).fadeOut(400, function(){
							current = (current === listLength) ? 0 : current;
							listItem.eq(current).fadeIn(400);
					   });
					}
					//Hide all but the first tweet
					listItem.slice(1).hide();

					//Rotate tweets at specified interval
					setInterval(rotateTweets, timeout);
				}		
				opts.onComplete(tweet_list);

			// Catch any failure to launch
			}).fail(function( jqxhr, textStatus, error ) {
				// Hide the tweet loader in favour of the response
				jQuery("#tweet_loader").remove();

				tweet_list.append('<li class="tweet_content item"><i class="fa fa-twitter"></i><p class="tweet_link">'+ opts.failed +'</p></li>');
				return;
			});
		});
	};

	// Define plugin defaults
	$.fn.tweetable.options = {
		limit: 5,                       // Number of tweets to show
		username: 'philipbeel',         // @username tweets to display
		time: false,                    // Display date
		rotate: false,                  // Rotate tweets
		speed: 5000,                    // Speed of rotation
		replies: false,                 // Filter out @replys
		position: 'append',             // Append position
		failed: "No tweets available",  // Twitter stream unavailable text
		loading: "Loading tweets...",	// Tweets loading message
		html5: false,                   // HTML5 Support
		retweets: false,                // Show retweets
		onComplete: function($ul) {}    // On complete callback
	};

})(jQuery);
jQuery.support.cors = true;