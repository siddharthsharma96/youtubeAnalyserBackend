const axios = require("axios");

const API_KEY = "AIzaSyAIv3Gf8L9sH6-0XtMBeb1lz2t-UpblKyE";
const BASE_API = "https://youtube.googleapis.com/youtube/v3/";

const fetchChannelInformation = async (channelId) => {
  // fetching channel information
  try {
    let response = await axios({
      url: `${BASE_API}channels?part=snippet%2Cstatistics&id=${channelId}&key=${API_KEY}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = {};
    if (response?.data?.items && response?.data?.items.length > 0) {
      let base = response?.data?.items[0];
      data = {
        title: base.snippet.title,
        stats: base.statistics,
      };
    }

    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Channel doesn't exist or some error occurred.");
  }
};

const fetchTopVideos = async (channelId, excludeVideoId, limit = 3) => {
  // using search API on behalf of channel ID to retrieve top viewed videos
  try {
    let response = await axios({
      url: `${BASE_API}search?channelId=${channelId}&maxResults=${limit}&type=video&order=viewCount&key=${API_KEY}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let modifiedResponse = response?.data?.items
      ?.filter((e) => e.id.videoId !== excludeVideoId)
      .map((item) => {
        return item?.id?.videoId;
      });

    if (modifiedResponse.length === limit) {
      modifiedResponse.splice(modifiedResponse.length - 1, 1);
    }
    return modifiedResponse;
  } catch (err) {
    console.error(err);
    throw new Error("Video doesn't exist or some error occurred.");
  }
};

const fetchVideoStatisticsById = async (videoIds = []) => {
  // fetching video statistics information for set of received video Ids
  try {
    let response = await axios({
      url: `${BASE_API}videos?part=snippet%2Cstatistics&id=${videoIds.join(
        ","
      )}&key=${API_KEY}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let modifiedResponse = response?.data?.items?.map((item) => {
      return {
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        channelId: item.snippet.channelId,
        publishedAt: item.snippet.publishedAt,
        stats: item.statistics,
        images: item.snippet.thumbnails,
      };
    });

    return modifiedResponse;
  } catch (err) {
    console.error(err.response.data);
    throw new Error("Video doesn't exist or some error occurred.");
  }
};

const CalculateEarning = (channelData, videoData) => {
  return (
    Math.min(channelData, videoData?.viewCount) +
    10 * videoData?.commentCount +
    5 * videoData?.likeCount
  );
};

exports.fetchVideoStatistics = async (req, res) => {
  return res.send({
    base: {
      id: "3gKvYR0P2F0",
      title:
        "Complete Interview Preparation to Crack Coding Interviews | GeeksforGeeks",
      description:
        "Be it product-based companies (like Amazon, Microsoft, Adobe, etc), startups (like Ola, Swiggy, Zomato, etc) or service-based companies (like TCS, Infosys, Cognizant, etc), this course is here to make you land the job you want!\n\nCourse Link for the same - https://practice.geeksforgeeks.org/courses/complete-interview-preparation\n\nOur other courses : \nhttps://practice.geeksforgeeks.org/courses/\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nIf you wish, translate into the local language and help us reach millions of other geeks:\nhttp://www.youtube.com/timedtext_cs_panel?c=UC0RhatS1pyxInC00YKjjBqQ&tab=2\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\nAlso, Subscribe if you haven't already! :)",
      channelId: "UC0RhatS1pyxInC00YKjjBqQ",
      publishedAt: "2020-11-18T13:04:34Z",
      stats: {
        viewCount: "1929728",
        likeCount: "952",
        favoriteCount: "0",
        commentCount: "40",
        earning: 680160,
      },
      images: {
        default: {
          url: "https://i.ytimg.com/vi/3gKvYR0P2F0/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/3gKvYR0P2F0/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/3gKvYR0P2F0/hqdefault.jpg",
          width: 480,
          height: 360,
        },
        standard: {
          url: "https://i.ytimg.com/vi/3gKvYR0P2F0/sddefault.jpg",
          width: 640,
          height: 480,
        },
        maxres: {
          url: "https://i.ytimg.com/vi/3gKvYR0P2F0/maxresdefault.jpg",
          width: 1280,
          height: 720,
        },
      },
    },
    channel: {
      title: "GeeksforGeeks",
      stats: {
        viewCount: "70372028",
        subscriberCount: "675000",
        hiddenSubscriberCount: false,
        videoCount: "2739",
      },
    },
    other: [
      {
        id: "KXAbAa1mieU",
        title:
          "Calculating Time Complexity | Data Structures and Algorithms| GeeksforGeeks",
        description:
          "🕰️ Ever wondered how to measure the efficiency of your algorithms? Join us on a journey into the world of time complexity, where we demystify the art of calculating algorithmic efficiency!\n\n🧠 In this video, we break down the key concepts behind time complexity and provide you with a step-by-step guide to understanding and calculating it for your own code. \n\n\nRead More About TIME COMPLEXITY: https://www.geeksforgeeks.org/time-complexity-and-space-complexity/\n\n-------------------------------------------------------------------------\n\n🔴 DSA Course Playlist: https://youtube.com/playlist?list=PLqM7alHXFySHWUSBXUW9eq-ajb2JLoFNS&si=m_4B8bdS8dSJ9W6m\n\n🔴 Sorting Algorithms Playlist: https://youtube.com/playlist?list=PLqM7alHXFySHrGIxeBOo4-mKO4H8j2knW&si=x2GkUwhC5tz8UdBH\n\n🔴 How much Maths is Needed for Programming: https://www.youtube.com/watch?v=NvB0IaR8TTI&t=278s\n\n🔴 C++ vs Java vs Python: https://www.youtube.com/watch?v=s28JOUvfLPA&t=399s\n\n-------------------------------------------------------------------------\n\n✨✨The Three 90 Challenge is here!!! ✨✨\n\nComplete 90% of your course in 90 Days and get 90% Refund!!!\n\n📚 Explore Our Courses: https://practice.geeksforgeeks.org/courses?utm_source=youtube&utm_medium=main_channel&utm_campaign=general\n\n🔴  Know more about the Three 90 Challenge from Sandeep Sir himself: https://www.youtube.com/watch?v=KyUbJ4aoIgQ\n\n📑 Read more about the Three90 Challenge: https://www.geeksforgeeks.org/three-90-challenge-get-90-refund-on-gfg-courses/\n\n-------------------------------------------------------------------------\n\nFollow us for more fun, knowledge, and resources:\n\n💬 Twitter- https://twitter.com/geeksforgeeks \n🧑‍💼 LinkedIn- https://www.linkedin.com/company/geeksforgeeks\n📷 Instagram- https://www.instagram.com/geeks_for_geeks/?hl=en \n💌 Telegram- https://t.me/s/geeksforgeeks_official \n\n📱 Download GeeksforGeeks' Official App: https://geeksforgeeksapp.page.link/gfg-app\n\n\nRelated Queries:\nDSA course\nData Structures and Algorithms \nDSA time complexity\nTime complexity of algorithms\nhow to calculate time complexity of algorithms\ntime and space complexity\ncomplexity analysis of algorithms\n\n\n#timecomplexity #big-o #algortihms #DSA #datastructuresandalgorithms #gfg #geeksforgeeks #dsaalgorithms #datastructures #DSA #practicequestion #complexityanalysis",
        channelId: "UC0RhatS1pyxInC00YKjjBqQ",
        publishedAt: "2020-01-09T06:52:14Z",
        stats: {
          viewCount: "689400",
          likeCount: "13865",
          favoriteCount: "0",
          commentCount: "236",
          earning: 746685,
        },
        images: {
          default: {
            url: "https://i.ytimg.com/vi/KXAbAa1mieU/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/KXAbAa1mieU/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/KXAbAa1mieU/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/KXAbAa1mieU/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/KXAbAa1mieU/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
      },
      {
        id: "sa9l-dTv9Gk",
        title:
          "Start Your Learning Journey With Us | GeeksforGeeks ft. Divyendu Sharma",
        description:
          "Hear what your favourite Bhaiya has to say about everyone's favourite learning platform!\nGeeksforGeeks: The one-stop destination for all the self learners who wish to make a name for themselves in this fast-paced world of technology. We have a vast library of well-written articles,  along with doubt-assistance programs, exclusive job portal, pocket-friendly courses and much-much more!\n\nSo what are you waiting for? Padhai-Likhai Karo and Start Your Coding Journey with Us!\n\nCheck out our Courses : https://practice.geeksforgeeks.org/courses\n\nDownload the latest edition of Geeks Digest: https://www.geeksforgeeks.org/geeks-digest/\n\nPlease Like, Comment and Share the Video among your friends and help everyone explore the world of Geeks!\n\nInstall our Android App: https://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nIf you wish, translate into the local language and help us reach millions of other geeks: http://www.youtube.com/timedtext_cs_panel?c=UC0RhatS1pyxInC00YKjjBqQ&tab=2\n\nFollow us on our Social Media Handles - \n\nTwitter- https://twitter.com/geeksforgeeks\nLinkedIn- https://www.linkedin.com/company/geeksforgeeks\nFacebook- https://www.facebook.com/geeksforgeeks.org\nInstagram- https://www.instagram.com/geeks_for_geeks/?hl=en\nReddit- https://www.reddit.com/user/geeksforgeeks\nTelegram- https://t.me/s/geeksforgeeks_official\n\nAlso, Subscribe if you haven't already! :)\n\n#LearnDSA #Learntocode #DivyenduSharma",
        channelId: "UC0RhatS1pyxInC00YKjjBqQ",
        publishedAt: "2021-03-02T09:30:08Z",
        stats: {
          viewCount: "647602",
          likeCount: "5174",
          favoriteCount: "0",
          commentCount: "311",
          earning: 676582,
        },
        images: {
          default: {
            url: "https://i.ytimg.com/vi/sa9l-dTv9Gk/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/sa9l-dTv9Gk/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/sa9l-dTv9Gk/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/sa9l-dTv9Gk/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/sa9l-dTv9Gk/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
      },
    ],
  });
  try {
    const request_id = req.query.id;

    // fetch current video statistics and extract channel Id
    const baseData = await fetchVideoStatisticsById([request_id]);

    // retrieve channel Id and subscriber count
    const channelInformation = await fetchChannelInformation(
      baseData[0].channelId
    );

    // retrieve top videos of current channel
    const topVideos = await fetchTopVideos(
      baseData[0].channelId,
      baseData[0].id
    );

    // retrieve video information for top videos
    const otherVideosData = await fetchVideoStatisticsById(topVideos);

    // calculate statistics and potential earning
    baseData[0].stats.earning = CalculateEarning(
      channelInformation.stats.subscriberCount,
      baseData[0].stats
    );

    otherVideosData.forEach((video) => {
      video.stats.earning = CalculateEarning(
        channelInformation.stats.subscriberCount,
        video.stats
      );
    });

    // return the response
    return res.send({
      base: baseData[0],
      channel: channelInformation,
      other: otherVideosData,
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};
