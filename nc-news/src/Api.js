import axios from "axios";

export const url = "https://afternoon-beyond-70751.herokuapp.com/api/";

export const getArticles = (page, sort, order) => {
  console.log(page);
  // if (page) {
  //   return axios.get(`${url}articles?p=${page}`).then(({ data }) => data);
  if (sort) {
    return axios
      .get(`${url}articles?p=${page}&?sort_by=${sort}`)
      .then(({ data }) => data);
  } else if (order) {
    return axios
      .get(`${url}articles?p=${page}&?order=${order}`)
      .then(({ data }) => data);
  } else if (sort && order) {
    return axios
      .get(`${url}articles?p=${page}&?sort_by=${sort}&?order=${order}`)
      .then(({ data }) => data);
  } else {
    return axios.get(`${url}articles?p=${page}`).then(({ data }) => data);
  }
};

export const getArticlesByTopic = topic => {
  // console.log(topic)
  return axios
    .get(`${url}articles?topic=${topic}`)
    .then(({ data }) => console.log(data) || data);
};

export const getSingleArticle = id => {
  return axios.get(`${url}articles/${id}`).then(({ data }) => data);
};

export const getUsers = user => {
  if (user) return axios.get(`${url}users/${user}`).then(({ data }) => data);
  else return axios.get(`${url}users`).then(({ data }) => data);
};

export const getTopics = () => {
  return axios.get(`${url}topics`).then(({ data }) => data);
};

export const getComments = id => {
  return axios.get(`${url}articles/${id}/comments`).then(({ data }) => data);
};

//WILL EVENTUALLY REFORMAT TO REDUCE THE AMOUNT OF FUNCTIONS
