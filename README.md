# Random-Word-Search

Visit the site [here](https://harman-maan.github.io/Random-Word/).

I am using [Random word API](https://random-word-api.herokuapp.com/home) for the project because it is fast and simple.
<hr width="50%">

I couldn't complete 50 searches to earn Microsoft rewards points every day. So, I build a site that would do it for me. It works on both, desktop and mobile.

(On mobile, use Edge browser not Bing App for best results.)

## Main interface

When you land on page you will have a random word. Below it a button to get new random word, beside it is a search button which will open a new tab to search that word on Bing.

## Auto Search

### Let's first understand how it works.
You earn 3 points for searching something on Bing. If you are on level two and use Edge browser, you can earn maximum 162 points a day via searching 54 times (34 on desktop and 20 on mobile). 
Most of us fail to search that many times a day. However, no need to worry, this site will do the searching for you.

Here, we take a random word from the [Random word API](https://random-word-api.herokuapp.com/home), search it on new tab, and repeat this as many times as you have specified.
Since you get points for searching, each tab will earn you 3 points.
Disadvantage of this site is that you have to close all the newly created tabs manually.

Note: To make this work, you have to allow this site to create pop ups which just means allowing the site to create multiple tabs.
Don't do this for other sites, they might be trying to steal your data or crash your system.
You can make sure I am not trying to do the same by going through the code.


### How to use it
When you open the site, you would see an "Auto Search" option in the navbar. 
Once you click on it, you will see:
 1. A drop-down list where you select the time interval between creation of each tab. (Minimum time is 4 sec)
 2. An input area asking you how many tabs to create.
 3. Then click start and sit back as the new tabs are being created. (Don't click the button again and again)

*Generating a lot  of tabs at once may result in browser not responding, system slowing down, or some other issue.
Thus, I have set the maximum limit to 30 tabs at a time. After all the 30 tabs are created close them and repeat the steps again.*
 
## History
"History" is second option in navbar, which simply contains the list of words which have been received from API.
