function CModeMenu(){
    var _oBg;
    var _oContainerEasy;
    var _oContainerNormal;
    var _oContainerHard;
    var _oTextMode1;
    var _oTextEasy;
    var _oTextMode2;
    var _oTextNormal;
    var _oTextMode3;
    var _oTextHard;
    var _oEasyButton;
    var _oNormalButton;
    var _oHardButton;
    var _oTextTop;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    var _oParent;
    
    var _oFade;
    var _oAudioToggle;
    var _oListenerEasy;
    var _oListenerNormal;
    var _oListenerHard;
    
    var _pStartPosAudio;
    var _pStartPosFullscreen;
    
    this._init = function(){
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_layout'));
        s_oStage.addChild(_oBg);

        
        _oTextTop = new createjs.Text(TEXT_TOP_MODE,"60px "+PRIMARY_FONT, "#ffffff");
        _oTextTop.x = CANVAS_WIDTH/2;
        _oTextTop.y = (CANVAS_HEIGHT/2)-170;
	_oTextTop.shadow = new createjs.Shadow("#000000", 3, 3, 3);
        _oTextTop.textAlign = "center";
        _oTextTop.lineWidth = 800;
        s_oStage.addChild(_oTextTop);

        _oContainerEasy = new createjs.Container();
        _oContainerEasy.x = CANVAS_WIDTH/2 - 440;
        _oContainerEasy.y = 369;
        if (!s_bMobile){
            _oContainerEasy.cursor = "pointer";
	}
        
        _oContainerNormal = new createjs.Container();
        _oContainerNormal.x = CANVAS_WIDTH/2 -120;
        _oContainerNormal.y = 369;
        if (!s_bMobile){
            _oContainerNormal.cursor = "pointer";
	}
        
        _oContainerHard = new createjs.Container();
        _oContainerHard.x = CANVAS_WIDTH/2 + 200;
        _oContainerHard.y = 369;
        if (!s_bMobile){
            _oContainerHard.cursor = "pointer";
	}

        _oTextMode1 = new createjs.Text(TEXT_MODE_1,"28px "+PRIMARY_FONT, "#01ff8f");
        _oTextMode1.x = 122;
        _oTextMode1.y = 88;
		_oTextMode1.shadow = new createjs.Shadow("#000000", 3, 3, 3);
	_oTextMode1.textBaseline = "alphabetic";
        _oTextMode1.textAlign = "center";
        _oTextMode1.lineWidth = 300;
        _oContainerEasy.addChild(_oTextMode1);

        _oTextEasy = new createjs.Text(TEXT_EASY,"34px "+PRIMARY_FONT, "#ffffff");
        _oTextEasy.x = 122;
        _oTextEasy.y = 35;
		_oTextEasy.shadow = new createjs.Shadow("#000000", 3, 3, 3);
	_oTextEasy.textBaseline = "alphabetic";
        _oTextEasy.textAlign = "center";
        _oTextEasy.lineWidth = 300;
        _oContainerEasy.addChild(_oTextEasy);
        
        _oTextMode2 = new createjs.Text(TEXT_MODE_2,"28px "+PRIMARY_FONT, "#01ff8f");
        _oTextMode2.x = 122;
        _oTextMode2.y = 88;
		_oTextMode2.shadow = new createjs.Shadow("#000000", 3, 3, 3);
        _oTextMode2.textBaseline = "alphabetic";
        _oTextMode2.textAlign = "center";
        _oTextMode2.lineWidth = 300;
        _oContainerNormal.addChild(_oTextMode2);
        
        _oTextNormal = new createjs.Text(TEXT_NORMAL,"34px "+PRIMARY_FONT, "#ffffff");
        _oTextNormal.x = 125;
        _oTextNormal.y = 35;
		_oTextNormal.shadow = new createjs.Shadow("#000000", 3, 3, 3);
        _oTextNormal.textBaseline = "alphabetic";
        _oTextNormal.textAlign = "center";
        _oTextNormal.lineWidth = 300;
        _oContainerNormal.addChild(_oTextNormal);
        
        _oTextMode3 = new createjs.Text(TEXT_MODE_3,"28px "+PRIMARY_FONT, "#01ff8f");
        _oTextMode3.x = 122;
        _oTextMode3.y = 88;
		_oTextMode3.shadow = new createjs.Shadow("#000000", 3, 3, 3);
        _oTextMode3.textBaseline = "alphabetic";
        _oTextMode3.textAlign = "center";
        _oTextMode3.lineWidth = 300;
        _oContainerHard.addChild(_oTextMode3);
        
        _oTextHard = new createjs.Text(TEXT_HARD,"34px "+PRIMARY_FONT, "#ffffff");
        _oTextHard.x = 125;
        _oTextHard.y = 35;
		_oTextHard.shadow = new createjs.Shadow("#000000", 3, 3, 3);
        _oTextHard.textBaseline = "alphabetic";
        _oTextHard.textAlign = "center";
        _oTextHard.lineWidth = 300;
        _oContainerHard.addChild(_oTextHard);
        
        s_oStage.addChild(_oContainerEasy);
        s_oStage.addChild(_oContainerNormal);
        s_oStage.addChild(_oContainerHard);
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height/2)- 10, y: (oSprite.height/2) + 10};
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);          
        }

        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && screenfull.enabled){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            _pStartPosFullscreen = {x: oSprite.width/4 + 10,y:(oSprite.height/2) + 10};

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        var graphics = new createjs.Graphics().beginFill("rgba(158,158,158,0.01)").drawRect(4, 0, 240, 250);
		
        _oEasyButton = new createjs.Shape(graphics);
        _oContainerEasy.addChild(_oEasyButton);
        _oListenerEasy = _oEasyButton.on("pressup", this._selectEasy);

        _oNormalButton = new createjs.Shape(graphics);
        _oContainerNormal.addChild(_oNormalButton);
        _oListenerNormal = _oNormalButton.on("pressup", this._selectNormal);     

        _oHardButton = new createjs.Shape(graphics);
        _oContainerHard.addChild(_oHardButton);
        _oListenerHard = _oHardButton.on("pressup", this._selectHard);


        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        
        s_oStage.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha:0}, 1000).call(function(){_oFade.visible = false;});
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };

    this.refreshButtonPos = function(iNewX,iNewY){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }
        
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + s_iOffsetX,_pStartPosFullscreen.y + s_iOffsetY);
        }
    };
    
    this._selectEasy = function(){
        
        playSound("click",1,false);
        _oParent.unload();
        s_oMain.gotoGame(MODE_EASY);
    };
    
    
    this._selectNormal = function(){
        
        playSound("click",1,false);
        _oParent.unload();
        s_oMain.gotoGame(MODE_NORMAL);
    };

    this._selectHard = function(){
        playSound("click",1,false);
        _oParent.unload();
        s_oMain.gotoGame(MODE_HARD);
    };
    
    this.unload = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.unload();
        }
        
        _oEasyButton.off("pressup", _oListenerEasy);
        _oNormalButton.off("pressup", _oListenerNormal);
        _oHardButton.off("pressup", _oListenerHard);
        
        s_oStage.removeAllChildren();
        _oBg = null;
        
        s_oModeMenu = null;
    };
    
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onButPlayRelease = function(){
        this.unload();
        
        playSound("click",1,false);
        
        s_oMain.gotoGame();
    };
    
    this.resetFullscreenBut = function(){
	if (_fRequestFullScreen && screenfull.enabled){
		_oButFullscreen.setActive(s_bFullscreen);
	}
    };
    
    this._onFullscreenRelease = function(){
        if(s_bFullscreen) { 
		_fCancelFullScreen.call(window.document);
	}else{
		_fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();

    };

    _oParent=this;
    s_oModeMenu = this;
    this._init();
}

var s_oModeMenu = null;