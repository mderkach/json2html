/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
import axios from 'axios';

const BASE_URI = 'http://localhost:4000';

const html = {
  wrapEl: document.querySelector('#content'),
  parser: function (data) {
    const type = data.type;
    const children = data.children;
    const temp = [];

    if (children) {
      for (let i = 0; i < children.length; i += 1) {
        temp.push(html.parser(children[i]));
      }
    }

    switch (type) {
      case 'table':
        return html.renderTable(temp);
      case 'head':
        return html.renderRow(temp, data, 'thead');
      case 'row':
        return html.renderRow(temp, data, 'tr');
      case 'body':
        return html.renderRow(temp, data, 'tbody');
      case 'div':
        return html.renderRow(temp, data, 'div');
      case 'form':
        return html.renderForm(temp, data);
      case 'input':
        return html.renderInput(temp, data);
      case 'submit':
        return html.renderSubmit(temp, data);
      default:
        return html.renderCell(temp, data);
    }
  },
  renderTable: function (childs, data) {
    const tableWr = document.createElement('table');
    tableWr.className = 'table table-dark';

    for (let i = 0; i < childs.length; i += 1) {
      tableWr.appendChild(childs[i]);
    }

    return tableWr;
  },
  renderRow: function (childs, data, nodeType) {
    const tableR = document.createElement(nodeType);

    if (data.class) tableR.className = data.class;
    for (let i = 0; i < childs.length; i += 1) {
      tableR.appendChild(childs[i]);
    }

    return tableR;
  },
  renderCell: function (childs, data) {
    const tableC = document.createElement('td');
    tableC.setAttribute('scope', data.type);
    tableC.innerHTML = data.text;

    return tableC;
  },
  renderForm: function (childs, data) {
    const formWr = document.createElement('form');

    for (let i = 0; i < childs.length; i += 1) {
      formWr.appendChild(childs[i]);
    }

    return formWr;
  },
  renderInput: function (childs, data) {
    const formInp = document.createElement('input');
    formInp.className = 'form-control';
    formInp.setAttribute('type', 'text');
    formInp.setAttribute('id', data.name);

    if (data.label) {
      const group = document.createElement('div');
      group.className = 'form-group';
      group.innerHTML = data.label;

      const label = document.createElement('label');
      label.setAttribute('for', data.name);

      group.appendChild(label);
      group.appendChild(formInp);

      return group;
    }

    return formInp;
  },
  renderSubmit: function (childs, data) {
    const formSub = document.createElement('button');
    formSub.className = 'btn btn-primary';
    formSub.setAttribute('type', 'submit');
    formSub.innerHTML = data.label;

    return formSub;
  },
  init: function () {
    if (html.wrapEl) {
      if (html.wrapEl.firstChild) {
        this.wrapEl.childNodes.forEach((child) => {
          child.remove();
        });
      } else {
        axios.get(`${BASE_URI}/data`).then((res) => {
          html.wrapEl.appendChild(html.parser(res.data));
        });
      }
    }
  },
};

export default html;
