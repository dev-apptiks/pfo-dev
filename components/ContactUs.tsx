import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import classnames from 'classnames';
import Alert from './Alerts';

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from 'reactstrap';

export const ContactUs = () => {
  const form = useRef<HTMLFormElement>(null);
  const [alert, setAlert] = useState<{
    color: string;
    icon: string;
    message: string;
  } | null>(null);

  const successAlert = {
    color: 'success',
    icon: 'ni ni-like-2',
    message: ' Your message has been sent successfully!',
  };

  const errorAlert = {
    color: 'danger',
    icon: 'ni ni-bell-55',
    message: ' Oops! Something went wrong. Please try again later.',
  };

const sendContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('contact submitting');
    console.log(form.current);

    const initialValues = {
      name: e.currentTarget.user_name.value,
      email: e.currentTarget.user_email.value,
      message:e.currentTarget.user_message.value,
    };

    console.log("S3 configured !!!");

console.log(initialValues);
    try {
      const response = fetch("/api/users", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(initialValues),
      });
    } catch (error) {
      console.error("Error:", error);
    }

    console.log("<<<<<<<  jsonplaceholder api response >>>>>>>");
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
    console.log("<<<<<<< jsonplaceholder api response >>>>>>>");

    console.log("<<<<<<< nextjs api response >>>>>>>");
    fetch('/api/users')
    .then(response => response.json())
    .then(json => console.log("EXISTING USERS ARE ",json));
    console.log("<<<<<<< nextjs api response >>>>>>>");

}

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Eamil submitting');

    console.log(form.current);

    const emailJsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;

    const emailJsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    const emailJsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (
      emailJsServiceId &&
      emailJsTemplateId &&
      emailJsPublicKey &&
      form.current
    ) {
      emailjs
        .sendForm(
          emailJsServiceId,
          emailJsTemplateId,
          form.current,
          emailJsPublicKey
        )
        .then(
          (result) => {
            console.log(result.text);
            setAlert(successAlert);
          },
          (error) => {
            console.log(error.text);
            setAlert(errorAlert);
          }
        );
    }
  };

  return (
    <>
      <section className="section section-lg section-shaped">
        {/* <form ref={form} onSubmit={sendEmail}> */}
        <form ref={form} onSubmit={sendContact}>
          {alert && (
            <Alert
              color={alert.color}
              icon={alert.icon}
              message={alert.message}
            />
          )}
          <Container>
            <Row className="justify-content-center">
              <Col lg="8">
                <Card className="bg-gradient-secondary shadow">
                  <CardBody className="p-lg-5">
                    <h4 className="mb-1">Want to work with me?</h4>
                    <p className="mt-0">
                      Reach out to me using the form below.
                    </p>
                    <FormGroup className={classnames('mt-5', {})}>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-user-run" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Your name"
                          type="text"
                          name="user_name"
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className={classnames({})}>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email address"
                          name="user_email"
                          type="email"
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className="mb-4">
                      <Input
                        className="form-control-alternative"
                        cols="80"
                        name="user_message"
                        placeholder="Type a message..."
                        rows="4"
                        type="textarea"
                      />
                    </FormGroup>
                    <div>
                      <Button
                        block
                        className="btn-round"
                        color="default"
                        size="lg"
                        type="submit"
                      >
                        Send Message
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </form>
      </section>
    </>
  );
};

export default ContactUs;
