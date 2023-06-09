import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

const getUserProphecy = async (userId, setProphecies, setUserInfo) => {
  try {
    await API.get("/prophecy/get/" + userId, { withCredentials: true }).then(
      (res) => {
        const { data } = res;
        console.log(data);
        let propheciesList = data
          .slice(0, data.length - 1)
          .sort(
            (objA, objB) =>
              Number(new Date(objA.createdTime)) -
              Number(new Date(objB.createdTime))
          )
          .reverse();
        setProphecies(propheciesList);
        // setProphecies(data.slice(0, data.length - 2))
        if (setUserInfo) {
          setUserInfo(data[data.length - 1]);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const getUserVotedProphecy = async (userId, setProphecies) => {
  try {
    await API.get("/prophecy/getVoted/" + userId, {
      withCredentials: true,
    }).then((res) => {
      const { data } = res;
      let propheciesList = data
        .sort(
          (objA, objB) =>
            Number(new Date(objA.createdTime)) -
            Number(new Date(objB.createdTime))
        )
        .reverse();
      setProphecies(propheciesList);
    });
  } catch (error) {
    console.log(error);
  }
};

async function getData(setProphecies) {
  await fetch(`${process.env.REACT_APP_API_URL}/prophecy/getAll`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((jsondata) => {
      setProphecies(jsondata);
      //default : store by number of user participated(HOT)
      jsondata = jsondata.sort((objA, objB) => {
        if (objA.numUser > objB.numUser) return -1;
        if (objB.numUser > objA.numUser) return 1;
        //if prophecies having same number of user participated, then display it by time
        return (
          (Number(new Date(objA.createdTime)) -
            Number(new Date(objB.createdTime))) *
          -1
        );
      });
      setProphecies(jsondata);
    })
    .catch((error) => console.log("error", error));
}

// sort prophecies by number of user participate
function sortByParticipated(prophecies, setProphecies) {
  let propheciesList = prophecies.sort((objA, objB) => {
    if (objA.numUser > objB.numUser) return -1;
    if (objB.numUser > objA.numUser) return 1;
    //if prophecies having same number of user participated, then display it by time
    return (
      (Number(new Date(objA.createdTime)) -
        Number(new Date(objB.createdTime))) *
      -1
    );
  });
  setProphecies(propheciesList);
}

// sort prophecies by created time
function sortByTime(prophecies, setProphecies) {
  let propheciesList = prophecies
    .sort(
      (objA, objB) =>
        Number(new Date(objA.createdTime)) - Number(new Date(objB.createdTime))
    )
    .reverse();
  setProphecies(propheciesList);
}

export {
  getData,
  sortByParticipated,
  sortByTime,
  getUserProphecy,
  getUserVotedProphecy,
};
