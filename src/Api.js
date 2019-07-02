import axios from 'axios';
import { navigate } from '@reach/router';

export const url = 'https://ncnewz.herokuapp.com/api/';

export const getArticles = (p, sort_by, order, topic) => {
  return axios
    .get(`${url}articles`, {
      params: {
        p,
        sort_by,
        order,
        topic
      }
    })
    .then(({ data }) => data);
};

export const postArticle = post => {
  return axios
    .post(`${url}articles`, { ...post })
    .then(({ data }) => navigate(`/articles/${data.article.article_id}`));
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

export const deleteItem = comment_id => {
  return axios.delete(`${url}comments/${comment_id}`);
};

export const postComment = (article_id, post) => {
  axios
    .post(`${url}articles/${article_id}/comments`, { ...post })
    .then(({ data }) => data);
};

export const postTopic = post => {
  return axios.post(`${url}topics`, { ...post }).then(({ data }) => {
    navigate('/topics');
  });
};

export const postUser = post => {
  return axios.post(`${url}users`, { ...post }).then(({ data }) => {
    navigate(`/users`);
  });
};

export const deleteArticle = article_id => {
  return axios.delete(`${url}articles/${article_id}`).then(({ data }) => {
    navigate('/');
  });
};
