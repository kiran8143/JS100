function init() {
    root = new View();

    var content = new ListView({
        backgroundColor: false,
        metrics: {
            x: 0,
            y: 0,
            scalar: {
                width: 1,
                height: 1
            }
        },
        strokeColor: "white"
    })
    root.addSubview(content);

    var title = new View({
        backgroundColor: "#3b5998",
        metrics: {
            x: 0,
            y: 0,
            height: 45,
            scalar: {
                width: 1
            }
        }
    });

    title.addSubview(new TextView({
        metrics: {
            x: 0,
            y: 12.5,
            scalar: {
                width: 1,
                height: 1
            }
        },
        justify: "center",
        color: "white",
        font:"Verdana",
        text: "Friend Requests",
        fontSize: 20
    }));


    title.addSubview(new ImageView({
        metrics: {
            x: -30,
            y: 12.5,
            height: 20,
            width: 20,

            scalar: {
                x: 1
            }
        },
        src: "http://png-2.findicons.com/files/icons/2427/retina/64/plus.png"
    }))

    content.addSubview(title);

    var contentScroll = new ScrollView({
        metrics: {
            x: 0,
            y: 0,
            height: -90.5,
            scalar: {
                width: 1,
                height: 1
            }
        }
    })

    var contentList = new ListView({
        metrics: {
            x: 0,
            y: 0,
            height: -90.5,
            scalar: {
                width: 1,
                height: 1
            }
        },
        resizesToContent: true
    });

    if (getFriendRequestData().data.length > 0) {

        var friendrequests = getFriendRequests();
        for (var i = 0; i < friendrequests.length; i++) {
            contentList.addSubview(friendrequests[i]);
        }
    } else {
        var noFriends = new View({
            metrics: {
                x: 0,
                y: 0,
                height: 100,
                scalar: {
                    width: 1
                }
            },
            backgroundColor:"#f7f7f7"
        })

        noFriends.addSubview(new TextView({
            metrics: {
                x: 0,
                y: 42.5,
                scalar: {
                    width: 1,
                    height: 1
                }
            },
            justify: "center",
            text:"No Friend Requests"
        }))

        contentList.addSubview(noFriends);

    }
    knowPeople = new View({
        backgroundColor: "#f7f7f7",
        metrics: {
            x: 0,
            y: 0,
            height: 30,
            scalar: {
                width: 1
            }
        },
        strokeColor: "gray"
    });

    knowPeople.addSubview(new TextView({
        metrics: {
            x: 5,
            y: 9,
            scalar: {
                height: 1,
                width: 1
            }
        },
        text: "PEOPLE YOU MAY KNOW",
        fontSize: 12
    }))

    contentList.addSubview(knowPeople);

    var knowpeople = getKnowPeople();

    for (var i = 0; i < knowpeople.length; i++) {
        contentList.addSubview(knowpeople[i]);
    }

    var seeAll = new View({
        metrics: {
            x: 0,
            y: 0,
            height: 50,
            scalar: {
                width:1
            }
        },
        strokeColor: "white"
    })

    seeAll.addSubview(new TextView({
        metrics: {
            x: 10,
            y: 10,
            height: 20,
            scalar: {
                width:1
            }
        },
        text: "See All",
        fontSize:12,
        color: "#3b5998",
        decoration: "bold"
    }))

    contentList.addSubview(seeAll);

    contentScroll.addSubview(contentList);

    content.addSubview(contentScroll);

    navBar = getNavBar();

    content.addSubview(navBar)
}
init();



function getFriendRequests(a) {
    var data = getFriendRequestData().data;

    var friendRequests = [];
    for (var i = 0; i < data.length; i++) {
        (function () {
            var friendrequest = data[i];

            var friendRequestRow = new View({
                backgroundColor: (friendrequest.viewed) ? "white" : "#dfe3ee",
                metrics: {
                    x: 0,
                    y: 0,
                    height: 100,
                    scalar: {
                        width: 1
                    }
                },
                strokeColor: "gray",

            })

            friendRequestRow.addSubview(new ImageView({
                metrics: {
                    x: 10,
                    y: 10,
                    width: 80,
                    height: 80
                },
                src: friendrequest.img
            }));

            friendRequestRow.addSubview(new TextView({
                metrics: {
                    x: 100,
                    y: 15,
                    height: 30,
                    scalar: {
                        width: 1
                    }
                },
                text: friendrequest.name,
                color: "#3b5998",
                decoration: "bold"
            }));

            friendRequestRow.addSubview(new TextView({
                metrics: {
                    x: 100,
                    y: 37.5,
                    height: 20,
                    scalar: {
                        width: 1
                    }
                },
                text: friendrequest.friend + " is a mutual friend.",
                fontSize: 12
            }));

            var confirmDelete = new View({
                metrics: {
                    x: 100,
                    y: 60,
                    height: 30,
                    width: 250
                },
                strokeColor: friendRequestRow.backgroundColor
            })

            var confirmFriend = new View({
                backgroundColor: "#1975d1",
                metrics: {
                    x: 0,
                    y: 0,
                    scalar: {
                        width: 0.45,
                        height: 1
                    }
                },
                click: function () {
                    confirmDelete.makeAnimation({
                        x: 500,
                        alpha: 0
                    }, 15);
                    var nowFriends = new TextView({
                        metrics: {
                            x: 100,
                            y: 60,
                            height: 30,
                            width: 250
                        },
                        justify: "center",
                        text: "You are now friends"
                    });
                    friendRequestRow.addSubview(nowFriends);
                }

            });

            confirmFriend.addSubview(new TextView({
                metrics: {
                    x: 0,
                    y: 7.5,
                    scalar: {
                        width: 1,
                        height: 1
                    }
                },
                justify: "center",
                text: "Confirm",
                color: "white",
                fontSize: 12
            }));

            var deleteFriend = new View({
                backgroundColor: "white",
                metrics: {
                    y: 0,
                    scalar: {
                        x: 0.55,
                        width: 0.45,
                        height: 1
                    }
                },
                click: function () {
                    confirmDelete.makeAnimation({
                        x: 500,
                        alpha: 0
                    }, 5);
                    var nowFriends = new TextView({
                        metrics: {
                            x: 100,
                            y: 60,
                            height: 30,
                            width: 250
                        },
                        justify: "center",
                        text: "Request ignored"
                    });
                    friendRequestRow.addSubview(nowFriends);
                }
            });

            deleteFriend.addSubview(new TextView({
                metrics: {
                    x: 0,
                    y: 7.5,
                    scalar: {
                        width: 1,
                        height: 1
                    }
                },
                justify: "center",
                text: "Delete",
                color: "black",
                fontSize: 12
            }));

            confirmDelete.addSubview(confirmFriend);
            confirmDelete.addSubview(deleteFriend);

            friendRequestRow.addSubview(confirmDelete);

            friendRequests.push(friendRequestRow);
        })();
    }
    return friendRequests;
}

function getKnowPeople() {
    var data = getKnowPeopleData().data;

    var knowPeople = [];
    for (var i = 0; i < data.length; i++) {
        (function () {
            var knowperson = data[i];

            var knowPeopleRow = new View({
                metrics: {
                    x: 0,
                    y: 0,
                    height: 100,
                    scalar: {
                        width: 1
                    }
                },
                strokeColor: "white"
            })

            knowPeopleRow.addSubview(new ImageView({
                metrics: {
                    x: 10,
                    y: 12.5,
                    width: 75,
                    height: 75
                },
                src: knowperson.img
            }));

            knowPeopleRow.addSubview(new TextView({
                metrics: {
                    x: 100,
                    y: 35,
                    height: 30,
                    scalar: {
                        width: 1
                    }
                },
                text: knowperson.name,
                decoration: "bold"
            }));

            knowPeopleRow.addSubview(new TextView({
                metrics: {
                    x: 100,
                    y: 55,
                    height: 20,
                    scalar: {
                        width: 1
                    }
                },
                text: knowperson.numMutFriends + " mutual friends",
                fontSize: 12,
                color: "gray"
            }));

            var addFriend = new View({
                backgroundColor: "#3b5998",
                metrics: {
                    x: -85,
                    y: 35,
                    height: 25,
                    width: 75,
                    scalar: {
                        x: 1
                    }
                },
                click: function () {
                    addFriend.makeAnimation({
                        x: 0,
                        alpha: 0
                    }, 5);
                    var requestSent = new TextView({
                        metrics: {
                            x: -85,
                            y: 35,
                            height: 25,
                            width: 75,
                            scalar: {
                                x: 1
                            }
                        },
                        justify: "center",
                        text: "Request sent"
                    });
                    knowPeopleRow.addSubview(requestSent);
                }
            });

            addFriend.addSubview(new TextView({
                metrics: {
                    x: 0,
                    y: 7,
                    scalar: {
                        width: 1,
                        height: 1
                    }
                },
                justify: "center",
                text: "Add Friend",
                color: "white",
                fontSize: 12
            }));

            knowPeopleRow.addSubview(addFriend);

            knowPeople.push(knowPeopleRow);
        })();
    }
    return knowPeople;

}

function getFriendRequestData() {
    return {
        data: [
            {
                "img": "http://img1.wikia.nocookie.net/__cb20141108074537/powerlisting/images/5/5e/Amy-the-secret-life-of-the-american-teenager-19852399-500-375.jpg",
                "name": "Jane Doe",
                "friend": "Vincent Chen",
                "viewed": false
            },
            {
                "img": "http://upload.wikimedia.org/wikipedia/en/2/28/Deep_Fried_Man_portrait_-_real_name_Daniel_Friedman_-_South_African_Comedian.jpg",
                "name": "John Jay",
                "friend": "Joel Einbinder",
                "viewed": true
            }
        ]
    }
}

function getKnowPeopleData() {
    return {
        data: [
            {
                "img": "http://connectedwomanmag.com/wp-content/uploads/2015/01/black-woman-thinking.jpg",
                "name": "Mary Hansen",
                "numMutFriends": 14
            },
            {
                "img": "http://www.menshairstyles.net/d/76238-1/Young+Asian+man+hairstyles.PNG",
                "name": "Joe Schmoe",
                "numMutFriends": 52
            },
            {
                "img": "http://www.menshairstyles.net/d/76238-1/Young+Asian+man+hairstyles.PNG",
                "name": "Joe Schmoe",
                "numMutFriends": 52
            },
            {
                "img": "http://www.menshairstyles.net/d/76238-1/Young+Asian+man+hairstyles.PNG",
                "name": "Joe Schmoe",
                "numMutFriends": 52
            },
            {
                "img": "http://www.menshairstyles.net/d/76238-1/Young+Asian+man+hairstyles.PNG",
                "name": "Joe Schmoe",
                "numMutFriends": 52
            },
            {
                "img": "http://www.menshairstyles.net/d/76238-1/Young+Asian+man+hairstyles.PNG",
                "name": "Joe Schmoe",
                "numMutFriends": 52
            },
            {
                "img": "http://www.menshairstyles.net/d/76238-1/Young+Asian+man+hairstyles.PNG",
                "name": "Joe Schmoe",
                "numMutFriends": 52
            },
            {
                "img": "http://www.menshairstyles.net/d/76238-1/Young+Asian+man+hairstyles.PNG",
                "name": "Joe Schmoe",
                "numMutFriends": 52
            }
        ]
    }
}

function getNavBar() {
    var navBar = new ListView({
        metrics: {
            x: 0,
            y: -45.5,
            height: 45.5,
            scalar: {
                y: 1,
                width: 1
            }
        },
        horizontal: true
    });

    var fbBlue = "#3B5998"
    var darkBlue = "#243c6d"

    var focus = "notifications";
    var focusImg = notificationsTab;
    var focusWrapper = notificationsTabWrapper;

    // Tab 1 - Newsfeed
    var newsfeedTab = new ImageView({
        metrics: {
            width: 20,
            height: 20,
            x: -10,
            y: -10,
            scalar: {
                x: 0.5,
                y: 0.5
            }
        },
        src: "imgs/newsfeed.png"
    });
    var newsfeedTabWrapper = new View({
        backgroundColor: fbBlue,
        strokeColor: fbBlue,
        metrics: {
            x: 0,
            y: 0,
            scalar: {
                width: 0.1667,
                height: 1
            }
        },
        click: function (e) {
            if (focusImg) {
                focusImg.setSrc(deselect(focus));
                focusWrapper.backgroundColor = fbBlue
            }
            focus = "newsfeed";
            focusImg = newsfeedTab;
            focusWrapper = newsfeedTabWrapper;
            focusWrapper.backgroundColor = darkBlue;
            focusImg.setSrc("imgs/newsfeed_selected.png");
        }
    });
    newsfeedTabWrapper.addSubview(newsfeedTab);

    var requestsTab = new ImageView({
        metrics: {
            width: 20,
            height: 20,
            x: -10,
            y: -10,
            scalar: {
                x: 0.5,
                y: 0.5
            }
        },
        src: "imgs/friend_requests.png"
    });
    var requestsTabWrapper = new View({
        backgroundColor: fbBlue,
        strokeColor: fbBlue,
        metrics: {
            x: 0,
            y: 0,
            scalar: {
                width: 0.1667,
                height: 1
            }
        },
        click: function (e) {
            if (focusImg) {
                focusImg.setSrc(deselect(focus));
                focusWrapper.backgroundColor = fbBlue;
            }
            focus = "requests";
            focusImg = requestsTab;
            focusWrapper = requestsTabWrapper;
            focusWrapper.backgroundColor = darkBlue;
            focusImg.setSrc("imgs/friend_requests_selected.png");
        }
    });
    requestsTabWrapper.addSubview(requestsTab);

    var messagesTab = new ImageView({
        metrics: {
            width: 20,
            height: 20,
            x: -10,
            y: -10,
            scalar: {
                x: 0.5,
                y: 0.5
            }
        },
        src: "imgs/messenger.png"
    });
    var messagesTabWrapper = new View({
        backgroundColor: fbBlue,
        strokeColor: fbBlue,
        metrics: {
            x: 0,
            y: 0,
            scalar: {
                width: 0.1667,
                height: 1
            }
        },
        click: function (e) {
            if (focusImg) {
                focusImg.setSrc(deselect(focus));
                focusWrapper.backgroundColor = fbBlue;
            }
            focus = "messages";
            focusImg = messagesTab;
            focusWrapper = messagesTabWrapper;
            focusWrapper.backgroundColor = darkBlue;
            focusImg.setSrc("imgs/messenger_selected.png");
        }
    });
    messagesTabWrapper.addSubview(messagesTab);

    var notificationsTab = new ImageView({
        metrics: {
            width: 20,
            height: 20,
            x: -10,
            y: -10,
            scalar: {
                x: 0.5,
                y: 0.5
            }
        },
        src: "imgs/notifications.png"
    });
    var notificationsTabWrapper = new View({
        backgroundColor: fbBlue,
        strokeColor: fbBlue,
        metrics: {
            x: 0,
            y: 0,
            scalar: {
                width: 0.1667,
                height: 1
            }
        },
        click: function (e) {
            if (focusImg) {
                focusImg.setSrc(deselect(focus));
                focusWrapper.backgroundColor = fbBlue;
            }
            focus = "notifications";
            focusImg = notificationsTab;
            focusWrapper = notificationsTabWrapper;
            focusWrapper.backgroundColor = darkBlue;
            focusImg.setSrc("imgs/notifications_selected.png");
        }
    });
    notificationsTabWrapper.addSubview(notificationsTab);

    var searchTab = new ImageView({
        metrics: {
            width: 20,
            height: 20,
            x: -10,
            y: -10,
            scalar: {
                x: 0.5,
                y: 0.5
            }
        },
        src: "imgs/search.png"
    });
    var searchTabWrapper = new View({
        backgroundColor: fbBlue,
        strokeColor: fbBlue,
        metrics: {
            x: 0,
            y: 0,
            scalar: {
                width: 0.1667,
                height: 1
            }
        },
        click: function (e) {
            if (focusImg) {
                focusImg.setSrc(deselect(focus));
                focusWrapper.backgroundColor = fbBlue;
            }
            focus = "search";
            focusImg = searchTab;
            focusWrapper = searchTabWrapper;
            focusWrapper.backgroundColor = darkBlue;
            focusImg.setSrc("imgs/search_selected.png");
        }
    });
    searchTabWrapper.addSubview(searchTab);

    var moreTab = new ImageView({
        metrics: {
            width: 20,
            height: 20,
            x: -10,
            y: -10,
            scalar: {
                x: 0.5,
                y: 0.5
            }
        },
        src: "imgs/more.png"
    });
    var moreTabWrapper = new View({
        backgroundColor: fbBlue,
        strokeColor: fbBlue,
        metrics: {
            x: 0,
            y: 0,
            scalar: {
                width: 0.1667,
                height: 1
            }
        },
        click: function (e) {
            if (focusImg) {
                focusImg.setSrc(deselect(focus));
                focusWrapper.backgroundColor = fbBlue;
            }
            focus = "more";
            focusImg = moreTab;
            focusWrapper = moreTabWrapper;
            focusWrapper.backgroundColor = darkBlue;
            focusImg.setSrc("imgs/more_selected.png");
        }
    });
    moreTabWrapper.addSubview(moreTab);

    navBar.addSubview(newsfeedTabWrapper);
    navBar.addSubview(requestsTabWrapper);
    navBar.addSubview(messagesTabWrapper);
    navBar.addSubview(notificationsTabWrapper);
    navBar.addSubview(searchTabWrapper);
    navBar.addSubview(moreTabWrapper);

    return navBar;
}

function deselect(focus) {
    if (focus == "newsfeed") {
        return "imgs/newsfeed.png"
    } else if (focus == "requests") {
        return "imgs/friend_requests.png"
    } else if (focus == "messages") {
        return "imgs/messenger.png"
    } else if (focus == "notifications") {
        return "imgs/notifications.png"
    } else if (focus == "search") {
        return "imgs/search.png"
    } else if (focus == "more") {
        return "imgs/more.png"
    }
}