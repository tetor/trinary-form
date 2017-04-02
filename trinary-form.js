const _ = require('lodash');

/**
 * TrueとFalseのフォームのセット
 */
class Form {
  constructor(wrapper, target) {
    this.$wrapper = $(wrapper);
    this.target = target;
    this.key = this.$wrapper.data('trinary-form');

    // 同時に２つ押せない制御
    $('input[type=checkbox]', this.$wrapper).on('change', (e) => {
      if ($(e.target).prop('checked')) {
        // 一度全部チェック解除して、再度チェックしている
        $('input[type=checkbox]', this.$wrapper).prop('checked', false);
        $(e.target).prop('checked', true);
      }
    });
  }

  get val() {
    const v = $($('input[type=checkbox]:checked', this.$wrapper)[0]).val();
    if (v === 'true') return true;
    if (v === 'false') return false;
    return null;
  }
}


/**
 * 選択肢の集合
 */
class FormCollection {
  constructor(target) {
    this.target = target;
    const $formCol = $(`.trinary-forms[data-trinary-target=${this.target}`);
    const $wrappers = $('.trinary-form-wrapper', $formCol);
    this.forms = _.map($wrappers, v => new Form(v, this.target));
  }

  get answers() {
    let answers = { trues: [], falses: [], nulls: [] };
    this.forms.forEach(f => {
      const v = f.val;
      if (v === true) {
        answers.trues.push(f.key);
      } else if (v === false) {
        answers.falses.push(f.key);
      } else if (v === null) {
        answers.nulls.push(f.key);
      }
    });
    return answers;
  }
}

module.exports = FormCollection;
