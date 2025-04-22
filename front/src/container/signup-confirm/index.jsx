import "./index.css";
import Page from "../../component/page";
import Title from "../../component/title";
import Button from "../../component/button";
import BackButton from "../../component/back-button";
import StatusBar from "../../component/status-bar";
import FieldCode from "../../component/field-code";
import Form from "../../component/form"
import { Link } from "react-router-dom";

const data = {
  title: {
    text: "Confirm account",
    description: "Write the code you received",
  },
  button: "Confirm",

  fieldCode: {
    text: "Code",
  },
};

export default function Component() {
  return (
    <Page>
      <StatusBar />
      <BackButton />
      <Title title={data.title.text} description={data.title.description} />
      <Form>
        <FieldCode text={data.fieldCode.text} />
        <Link to="/balance">
          <Button children={data.button} />
        </Link>
      </Form>
    </Page>
  );
};