import { EMPTY, finalize, from, fromEvent, map, Observable, of, switchMap, tap } from 'rxjs';
import * as business from '../business.json';
import * as environment from '../environment.json';

const ENDPOINT_URL = environment.endpoints.contact.url;
const ENDPOINT_SECRET = environment.endpoints.contact.secret;

const TARGET_EMAIL = business.contact.email[0];

const FORM_SELECTOR = '#contact form';
const AUTOMATED_MAIL_SUBJECT = 'Solicitud de Contacto';
const ALERT_MESSAGES = {
  fakeSuccess: 'Gracias por probar el sistema de contacto. No se ha enviado ningún mensaje, pues este sitio no está aún publicado en Internet.',
  success: 'Muchas gracias por su mensaje. Le responderemos muy pronto.',
  error: `Tuvimos un problema al enviar su mensaje. Verifique haber ingresado toda la información obligatoria e inténtelo nuevamente.\nSi el problema persiste, le rogamos que haga llegar su solicitud a ${TARGET_EMAIL}`
};

function createPayload() {
  const fullname = (document.getElementById('fullname-input') as HTMLInputElement).value;
  const email = (document.getElementById('email-input') as HTMLInputElement).value;
  const phone = (document.getElementById('phone-input') as HTMLInputElement).value;
  const comments = (document.getElementById('comments-input') as HTMLInputElement).value;

  return Object.freeze({
    to: TARGET_EMAIL,
    secret: ENDPOINT_SECRET,
    from: `${fullname} <${email}>`,
    subject: AUTOMATED_MAIL_SUBJECT,
    message: `${comments}\nContacto\nEmail: ${email}${phone ? '\nFono: ' + phone : ''}`,
  });
}

function sendContactMessage(payload: any): Observable<any> {
  return from(new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject(xhr.response);
        }
      }
    };
    xhr.open('POST', ENDPOINT_URL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data);
  }));
}

fromEvent(document, 'DOMContentLoaded').pipe(
  switchMap(() => fromEvent(document.querySelector(FORM_SELECTOR) as HTMLFormElement, 'submit').pipe(
    tap(e => e.preventDefault()),
    map(() => createPayload())
  )),
  switchMap(payload => environment.isProduction ?
    sendContactMessage(payload).pipe(
      tap({
        next: () => {
          alert(ALERT_MESSAGES.success);
          (document.querySelector(FORM_SELECTOR) as HTMLFormElement).reset();
        },
        error: () => alert(ALERT_MESSAGES.error)
      })
    ) :
    EMPTY.pipe(
      finalize(() => alert(ALERT_MESSAGES.fakeSuccess))
    )
  )
).subscribe();
