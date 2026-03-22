class Question3{
    constructor(question, option1, option2){
        this.question = question;
        this.option1 = option1;
        this.option2 = option2;
    
        this.option1Button=createButton(this.option1);
        this.option1Button.style('font-size', '18px');
        this.option1Button.style('font-family', 'titleFont');
        this.option1Button.style('color', 'white');
        this.option1Button.style('background-color', 'black');
        this.option1Button.style('text-align', 'center');
        this.option1Button.style('border', 'none');
        this.option1Button.size(500, 80);
        this.option1Button.position(width*0.25 - 250, height/1.5);
        this.option1Button.hide();
    
    
        this.option2Button=createButton(this.option2);
        this.option2Button.style('font-size', '18px');
        this.option2Button.style('font-family', 'titleFont');
        this.option2Button.style('color', 'white');
        this.option2Button.style('background-color', 'black');
        this.option2Button.style('text-align', 'center');
        this.option2Button.style('border', 'none');
        this.option2Button.size(500, 80);
        this.option2Button.position(width*0.75 - 250, height/1.5);
        this.option2Button.hide();

        this.option1Button.style('background-color', 'black');
        this.option2Button.style('background-color', 'black');
    
    }

    display(){
        fill('white')
        textFont(titleFont); 
        textSize(34);
        textAlign(CENTER, CENTER)
        text(this.question, width/2, height/3);
    }
    show(){
        this.option1Button.show();
        this.option2Button.show();
    }
    hide(){
        this.option1Button.hide();
        this.option2Button.hide();
    }
}  