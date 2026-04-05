import {
    setMyContestsDB,
    getSubscriptionStatusDB,
    setSubscriptionStatusDB,
    setDailyChallengeDB,
    getMyContestsDB,
    fetchGfgDailyQuestion,
    getGfgContests,
} from "../Helper/DbHelper";
var browser = require("webextension-polyfill");



var myContests = [];
var subscriptionStatus = {};

var defaultDailyChallenge = {
    leetcode: {
        title: "Daily Challenge",
        difficulty: "",
        link: "",
        platform: "leetcode",
    },
    geeksforgeeks: {
        title: "Challenge of the Day",
        difficulty: "",
        link: "",
        platform: "geeksforgeeks",
    },
};

// ========================================== Helper ==================================================
function sortFunction(a, b) {
    // Handle both old format (start_time) and new format (startTimeISO)
    var dateA = new Date(a.startTimeISO || a.start_time).getTime();
    var dateB = new Date(b.startTimeISO || b.start_time).getTime();
    return dateA > dateB ? 1 : -1;
}

async function fetchContestDetails() {
    try {
        const res = await fetch(`/api/all`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        if (!res.ok) {
            throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();
        // Handle both paginated and non-paginated responses
        var contests = data.contests || data;
        
        // Get GFG contests if available
        let gfgContests = [];
        try {
            gfgContests = await getGfgContests();
        } catch (err) {
            console.log('GFG contests not available:', err);
        }
        
        var contestDetails = [...(Array.isArray(contests) ? contests : []), ...gfgContests];

        contestDetails.sort(sortFunction);
        return contestDetails;
    } catch (error) {
        console.error('Error fetching contest details:', error);
        throw error;
    }
}

async function fetchLeetCodeDailyQuestion() {
    const LEETCODE_API_ENDPOINT = "https://leetcode.com/graphql";
    const DAILY_CODING_CHALLENGE_QUERY = `
    query questionOfToday {
        activeDailyCodingChallengeQuestion {
            link
            question {
                difficulty
                title
            }
        }
    }`;

    const init = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: DAILY_CODING_CHALLENGE_QUERY }),
    };

    let res = await fetch(LEETCODE_API_ENDPOINT, init);
    if (!res.ok) {
        const message = "An error has occured";
        throw new Error(message);
    }
    res = await res.json();

    res = {
        link:
            "https://leetcode.com" + res.data.activeDailyCodingChallengeQuestion.link,
        difficulty: res.data.activeDailyCodingChallengeQuestion.question.difficulty,
        title: res.data.activeDailyCodingChallengeQuestion.question.title,
        platform: "leetcode",
    };
    return res;
}

async function fetchGfgDailyChallenge() {
    var res = await fetchGfgDailyQuestion();
    return res;
}
const updateDailyChallenge = async () => {
    var leetcodeChallenge = await fetchLeetCodeDailyQuestion();
    var gfgChallenge = await fetchGfgDailyChallenge();
    defaultDailyChallenge.leetcode = leetcodeChallenge;
    defaultDailyChallenge.geeksforgeeks = gfgChallenge;

    await setDailyChallengeDB(defaultDailyChallenge);
};

