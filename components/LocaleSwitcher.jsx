import React from 'react';
import IntlMixin from 'react-intl';
import { StoreMixin } from 'fluxible-app';

import I18nStore from '../stores/I18nStore';

import config from '../config/app';
import getIntl from '../actions/getI18n';

const LocaleSwitcher = React.createClass({

  mixins: [IntlMixin, StoreMixin],

  statics: {
    storeListeners: [I18nStore]
  },

  getInitialState() {
    return this.getStore(I18nStore).getState();
  },

  onChange() {
    const state = this.getStore(I18nStore).getState();
    this.setState(state);
  },

  handleLocaleChange(e) {
    this.props.context.executeAction(getIntl, {locale: e.target.value});
  },

  render() {
    return (
      <div className="locale-switcher">
        <label>
          {this.getIntlMessage(`localeSwitcher.label`)}&nbsp;
        <select 
            value={this.state.currentLocale} 
            onChange={this.handleLocaleChange}>
          {
            config.locales.map((locale) => {
              // bug with server side rendering:
              // https://github.com/facebook/react/issues/1398
              return (
                <option key={locale} value={locale} 
                  selected={this.state.currentLocale === locale}>
                  { this.getIntlMessage(`localeSwitcher.${locale}`) }
                </option>
              )
            })
          }
        </select>
        </label>
      </div>
    );
  }

});

export default LocaleSwitcher;