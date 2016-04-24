export class Validator {
    private form: JQuery;
    private messageTemplate = 
    `
    <ul class="validationMessage" id="[id]"></ul>
    `;
    private singleMessageTemplate = 
    `
    <li>[message]</li>
    `;
    private id: string;
    private validationMessageElement : JQuery;
    constructor(form: JQuery) {
        this.form = form;
        this.id = "ValidationMessage_" + new Date().getTime().toString();
        this.messageTemplate = this.messageTemplate.replace("[id]", this.id);
        this.form.prepend($(this.messageTemplate));
        this.validationMessageElement = this.form.find("#" + this.id);
        this.form.submit((e) => this.submit(e));
    }
    public submit(e: JQueryEventObject) {
        var passing = true;
        var message = "";
        this.validationMessageElement.html();
        this.form.find("[required]")
            .each((index, element) => {
                if ($(element).val() == "") {
                    passing = false;
                    var name = this.form.find(`[for="` + $(element).attr("name") + `"]`).val();
                    this.validationMessageElement.append($(this.singleMessageTemplate
                        .replace("[message]", name + " is a required field. please fill it out.") ) );
                }
                    
            });
        if (!passing)
            e.preventDefault();
    }

}