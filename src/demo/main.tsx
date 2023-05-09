import React from 'react';
import ReactDOM from 'react-dom';
import SchemaRenderer from '../';
import schema from './schema.json';

ReactDOM.render(<SchemaRenderer schema={schema} />, document.getElementById('root'));
