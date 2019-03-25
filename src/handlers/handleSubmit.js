import axios from "axios";
import url from "../Api";

const post = {
  title: this.state.title,
  topic: this.state.topic,
  author: this.state.author,
  body: this.state.body
};

export const handlePostSubmit = event => {
  event
    .preventDefault()
    .then(axios.post(`${url}articles`, { post }).then(({ data }) => data));
};
