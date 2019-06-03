/*
Copyright 2019 New Vector Ltd
Copyright 2019 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import React from 'react';
import PropTypes from 'prop-types';
import * as HtmlUtils from '../../../HtmlUtils';
import {formatTime} from '../../../DateUtils';
import {MatrixEvent} from 'matrix-js-sdk';
import {pillifyLinks} from '../../../utils/pillify';

export default class EditHistoryMessage extends React.Component {
    static propTypes = {
        // the message event being edited
        mxEvent: PropTypes.instanceOf(MatrixEvent).isRequired,
    };

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        pillifyLinks(this.refs.content.children, this.props.mxEvent);
    }

    componentDidUpdate() {
        pillifyLinks(this.refs.content.children, this.props.mxEvent);
    }

    render() {
        const event = this.props.mxEvent;
        const timestamp = formatTime(new Date(event.getTs()), true);
        const content = event.event.content["m.new_content"] || event.event.content;
        return <li className="edit" key={event.getId()}>
            <strong>{timestamp}</strong>
            <p ref="content">{HtmlUtils.bodyToHtml(content)}</p>
        </li>;
    }
}
