export default function forgotPasswordTemplate({linkRef}) {
	return `<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <!-- NAME: SELL PRODUCTS -->
        <!--[if gte mso 15]>
        <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>*|MC:SUBJECT|*</title>
        
    <style type="text/css">
\t\tp{
\t\t\tmargin:10px 0;
\t\t\tpadding:0;
\t\t}
\t\ttable{
\t\t\tborder-collapse:collapse;
\t\t}
\t\th1,h2,h3,h4,h5,h6{
\t\t\tdisplay:block;
\t\t\tmargin:0;
\t\t\tpadding:0;
\t\t}
\t\timg,a img{
\t\t\tborder:0;
\t\t\theight:auto;
\t\t\toutline:none;
\t\t\ttext-decoration:none;
\t\t}
\t\tbody,#bodyTable,#bodyCell{
\t\t\theight:100%;
\t\t\tmargin:0;
\t\t\tpadding:0;
\t\t\twidth:100%;
\t\t}
\t\t.mcnPreviewText{
\t\t\tdisplay:none !important;
\t\t}
\t\t#outlook a{
\t\t\tpadding:0;
\t\t}
\t\timg{
\t\t\t-ms-interpolation-mode:bicubic;
\t\t}
\t\ttable{
\t\t\tmso-table-lspace:0pt;
\t\t\tmso-table-rspace:0pt;
\t\t}
\t\t.ReadMsgBody{
\t\t\twidth:100%;
\t\t}
\t\t.ExternalClass{
\t\t\twidth:100%;
\t\t}
\t\tp,a,li,td,blockquote{
\t\t\tmso-line-height-rule:exactly;
\t\t}
\t\ta[href^=tel],a[href^=sms]{
\t\t\tcolor:inherit;
\t\t\tcursor:default;
\t\t\ttext-decoration:none;
\t\t}
\t\tp,a,li,td,body,table,blockquote{
\t\t\t-ms-text-size-adjust:100%;
\t\t\t-webkit-text-size-adjust:100%;
\t\t}
\t\t.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
\t\t\tline-height:100%;
\t\t}
\t\ta[x-apple-data-detectors]{
\t\t\tcolor:inherit !important;
\t\t\ttext-decoration:none !important;
\t\t\tfont-size:inherit !important;
\t\t\tfont-family:inherit !important;
\t\t\tfont-weight:inherit !important;
\t\t\tline-height:inherit !important;
\t\t}
\t\t.templateContainer{
\t\t\tmax-width:600px !important;
\t\t}
\t\ta.mcnButton{
\t\t\tdisplay:block;
\t\t}
\t\t.mcnImage,.mcnRetinaImage{
\t\t\tvertical-align:bottom;
\t\t}
\t\t.mcnTextContent{
\t\t\tword-break:break-word;
\t\t}
\t\t.mcnTextContent img{
\t\t\theight:auto !important;
\t\t}
\t\t.mcnDividerBlock{
\t\t\ttable-layout:fixed !important;
\t\t}
\t/*
\t@tab Page
\t@section Heading 1
\t@style heading 1
\t*/
\t\th1{
\t\t\t/*@editable*/color:#222222;
\t\t\t/*@editable*/font-family:Helvetica;
\t\t\t/*@editable*/font-size:40px;
\t\t\t/*@editable*/font-style:normal;
\t\t\t/*@editable*/font-weight:bold;
\t\t\t/*@editable*/line-height:150%;
\t\t\t/*@editable*/letter-spacing:normal;
\t\t\t/*@editable*/text-align:center;
\t\t}
\t/*
\t@tab Page
\t@section Heading 2
\t@style heading 2
\t*/
\t\th2{
\t\t\t/*@editable*/color:#222222;
\t\t\t/*@editable*/font-family:Helvetica;
\t\t\t/*@editable*/font-size:34px;
\t\t\t/*@editable*/font-style:normal;
\t\t\t/*@editable*/font-weight:bold;
\t\t\t/*@editable*/line-height:150%;
\t\t\t/*@editable*/letter-spacing:normal;
\t\t\t/*@editable*/text-align:left;
\t\t}
\t/*
\t@tab Page
\t@section Heading 3
\t@style heading 3
\t*/
\t\th3{
\t\t\t/*@editable*/color:#444444;
\t\t\t/*@editable*/font-family:Helvetica;
\t\t\t/*@editable*/font-size:22px;
\t\t\t/*@editable*/font-style:normal;
\t\t\t/*@editable*/font-weight:bold;
\t\t\t/*@editable*/line-height:150%;
\t\t\t/*@editable*/letter-spacing:normal;
\t\t\t/*@editable*/text-align:left;
\t\t}
\t/*
\t@tab Page
\t@section Heading 4
\t@style heading 4
\t*/
\t\th4{
\t\t\t/*@editable*/color:#949494;
\t\t\t/*@editable*/font-family:Georgia;
\t\t\t/*@editable*/font-size:20px;
\t\t\t/*@editable*/font-style:italic;
\t\t\t/*@editable*/font-weight:normal;
\t\t\t/*@editable*/line-height:125%;
\t\t\t/*@editable*/letter-spacing:normal;
\t\t\t/*@editable*/text-align:left;
\t\t}
\t/*
\t@tab Header
\t@section Header Container Style
\t*/
\t\t#templateHeader{
\t\t\t/*@editable*/background-color:#242424;
\t\t\t/*@editable*/background-image:none;
\t\t\t/*@editable*/background-repeat:no-repeat;
\t\t\t/*@editable*/background-position:50% 50%;
\t\t\t/*@editable*/background-size:contain;
\t\t\t/*@editable*/border-top:0;
\t\t\t/*@editable*/border-bottom:0;
\t\t\t/*@editable*/padding-top:45px;
\t\t\t/*@editable*/padding-bottom:45px;
\t\t}
\t/*
\t@tab Header
\t@section Header Interior Style
\t*/
\t\t.headerContainer{
\t\t\t/*@editable*/background-color:#242424;
\t\t\t/*@editable*/background-image:none;
\t\t\t/*@editable*/background-repeat:no-repeat;
\t\t\t/*@editable*/background-position:center;
\t\t\t/*@editable*/background-size:cover;
\t\t\t/*@editable*/border-top:0;
\t\t\t/*@editable*/border-bottom:0;
\t\t\t/*@editable*/padding-top:0;
\t\t\t/*@editable*/padding-bottom:0;
\t\t}
\t/*
\t@tab Header
\t@section Header Text
\t*/
\t\t.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
\t\t\t/*@editable*/color:#ffffff;
\t\t\t/*@editable*/font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
\t\t\t/*@editable*/font-size:16px;
\t\t\t/*@editable*/line-height:150%;
\t\t\t/*@editable*/text-align:left;
\t\t}
\t/*
\t@tab Header
\t@section Header Link
\t*/
\t\t.headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{
\t\t\t/*@editable*/color:#007C89;
\t\t\t/*@editable*/font-weight:normal;
\t\t\t/*@editable*/text-decoration:underline;
\t\t}
\t/*
\t@tab Body
\t@section Body Container Style
\t*/
\t\t#templateBody{
\t\t\t/*@editable*/background-color:#242424;
\t\t\t/*@editable*/background-image:none;
\t\t\t/*@editable*/background-repeat:no-repeat;
\t\t\t/*@editable*/background-position:center;
\t\t\t/*@editable*/background-size:cover;
\t\t\t/*@editable*/border-top:0;
\t\t\t/*@editable*/border-bottom:0;
\t\t\t/*@editable*/padding-top:0px;
\t\t\t/*@editable*/padding-bottom:0px;
\t\t}
\t/*
\t@tab Body
\t@section Body Interior Style
\t*/
\t\t.bodyContainer{
\t\t\t/*@editable*/background-color:#transparent;
\t\t\t/*@editable*/background-image:none;
\t\t\t/*@editable*/background-repeat:no-repeat;
\t\t\t/*@editable*/background-position:center;
\t\t\t/*@editable*/background-size:cover;
\t\t\t/*@editable*/border-top:0;
\t\t\t/*@editable*/border-bottom:0;
\t\t\t/*@editable*/padding-top:0;
\t\t\t/*@editable*/padding-bottom:0;
\t\t}
\t/*
\t@tab Body
\t@section Body Text
\t*/
\t\t.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
\t\t\t/*@editable*/color:#ffffff;
\t\t\t/*@editable*/font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
\t\t\t/*@editable*/font-size:16px;
\t\t\t/*@editable*/line-height:150%;
\t\t\t/*@editable*/text-align:left;
\t\t}
\t/*
\t@tab Body
\t@section Body Link
\t*/
\t\t.bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{
\t\t\t/*@editable*/color:#91aec1;
\t\t\t/*@editable*/font-weight:normal;
\t\t\t/*@editable*/text-decoration:underline;
\t\t}
\t/*
\t@tab Footer
\t@section Footer Style
\t*/
\t\t#templateFooter{
\t\t\t/*@editable*/background-color:#242424;
\t\t\t/*@editable*/background-image:none;
\t\t\t/*@editable*/background-repeat:no-repeat;
\t\t\t/*@editable*/background-position:center;
\t\t\t/*@editable*/background-size:cover;
\t\t\t/*@editable*/border-top:0;
\t\t\t/*@editable*/border-bottom:0;
\t\t\t/*@editable*/padding-top:45px;
\t\t\t/*@editable*/padding-bottom:63px;
\t\t}
\t/*
\t@tab Footer
\t@section Footer Interior Style
\t*/
\t\t.footerContainer{
\t\t\t/*@editable*/background-color:#transparent;
\t\t\t/*@editable*/background-image:none;
\t\t\t/*@editable*/background-repeat:no-repeat;
\t\t\t/*@editable*/background-position:center;
\t\t\t/*@editable*/background-size:cover;
\t\t\t/*@editable*/border-top:0;
\t\t\t/*@editable*/border-bottom:0;
\t\t\t/*@editable*/padding-top:0;
\t\t\t/*@editable*/padding-bottom:0;
\t\t}
\t/*
\t@tab Footer
\t@section Footer Text
\t*/
\t\t.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{
\t\t\t/*@editable*/color:#FFFFFF;
\t\t\t/*@editable*/font-family:Helvetica;
\t\t\t/*@editable*/font-size:12px;
\t\t\t/*@editable*/line-height:150%;
\t\t\t/*@editable*/text-align:center;
\t\t}
\t/*
\t@tab Footer
\t@section Footer Link
\t*/
\t\t.footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{
\t\t\t/*@editable*/color:#FFFFFF;
\t\t\t/*@editable*/font-weight:normal;
\t\t\t/*@editable*/text-decoration:underline;
\t\t}
\t@media only screen and (min-width:768px){
\t\t.templateContainer{
\t\t\twidth:600px !important;
\t\t}

}\t@media only screen and (max-width: 480px){
\t\tbody,table,td,p,a,li,blockquote{
\t\t\t-webkit-text-size-adjust:none !important;
\t\t}

}\t@media only screen and (max-width: 480px){
\t\tbody{
\t\t\twidth:100% !important;
\t\t\tmin-width:100% !important;
\t\t}

}\t@media only screen and (max-width: 480px){
\t\t.mcnRetinaImage{
\t\t\tmax-width:100% !important;
\t\t}

}\t@media only screen and (max-width: 480px){
\t\t.mcnImage{
\t\t\twidth:100% !important;
\t\t}

}\t@media only screen and (max-width: 480px){
\t\t.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{
\t\t\tmax-width:100% !important;
\t\t\twidth:100% !important;
\t\t}

}\t@media only screen and (max-width: 480px){
\t\t.mcnBoxedTextContentContainer{
\t\t\tmin-width:100% !important;
\t\t}

}\t@media only screen and (max-width: 480px){
\t\t.mcnImageGroupContent{
\t\t\tpadding:9px !important;
\t\t}

}\t@media only screen and (max-width: 480px){
\t\t.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
\t\t\tpadding-top:9px !important;
\t\t}

}\t@media only screen and (max-width: 480px){
\t\t.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
\t\t\tpadding-top:18px !important;
\t\t}

}\t@media only screen and (max-width: 480px){
\t\t.mcnImageCardBottomImageContent{
\t\t\tpadding-bottom:9px !important;
\t\t}

}\t@media only screen and (max-width: 480px){
\t\t.mcnImageGroupBlockInner{
\t\t\tpadding-top:0 !important;
\t\t\tpadding-bottom:0 !important;
\t\t}

}\t@media only screen and (max-width: 480px){
\t\t.mcnImageGroupBlockOuter{
\t\t\tpadding-top:9px !important;
\t\t\tpadding-bottom:9px !important;
\t\t}

}\t@media only screen and (max-width: 480px){
\t\t.mcnTextContent,.mcnBoxedTextContentColumn{
\t\t\tpadding-right:18px !important;
\t\t\tpadding-left:18px !important;
\t\t}

}\t@media only screen and (max-width: 480px){
\t\t.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
\t\t\tpadding-right:18px !important;
\t\t\tpadding-bottom:0 !important;
\t\t\tpadding-left:18px !important;
\t\t}

}\t@media only screen and (max-width: 480px){
\t\t.mcpreview-image-uploader{
\t\t\tdisplay:none !important;
\t\t\twidth:100% !important;
\t\t}

}\t@media only screen and (max-width: 480px){
\t/*
\t@tab Mobile Styles
\t@section Heading 1
\t@tip Make the first-level headings larger in size for better readability on small screens.
\t*/
\t\th1{
\t\t\t/*@editable*/font-size:30px !important;
\t\t\t/*@editable*/line-height:125% !important;
\t\t}

}\t@media only screen and (max-width: 480px){
\t/*
\t@tab Mobile Styles
\t@section Heading 2
\t@tip Make the second-level headings larger in size for better readability on small screens.
\t*/
\t\th2{
\t\t\t/*@editable*/font-size:26px !important;
\t\t\t/*@editable*/line-height:125% !important;
\t\t}

}\t@media only screen and (max-width: 480px){
\t/*
\t@tab Mobile Styles
\t@section Heading 3
\t@tip Make the third-level headings larger in size for better readability on small screens.
\t*/
\t\th3{
\t\t\t/*@editable*/font-size:20px !important;
\t\t\t/*@editable*/line-height:150% !important;
\t\t}

}\t@media only screen and (max-width: 480px){
\t/*
\t@tab Mobile Styles
\t@section Heading 4
\t@tip Make the fourth-level headings larger in size for better readability on small screens.
\t*/
\t\th4{
\t\t\t/*@editable*/font-size:18px !important;
\t\t\t/*@editable*/line-height:150% !important;
\t\t}

}\t@media only screen and (max-width: 480px){
\t/*
\t@tab Mobile Styles
\t@section Boxed Text
\t@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px.
\t*/
\t\t.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
\t\t\t/*@editable*/font-size:14px !important;
\t\t\t/*@editable*/line-height:150% !important;
\t\t}

}\t@media only screen and (max-width: 480px){
\t/*
\t@tab Mobile Styles
\t@section Header Text
\t@tip Make the header text larger in size for better readability on small screens.
\t*/
\t\t.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
\t\t\t/*@editable*/font-size:16px !important;
\t\t\t/*@editable*/line-height:150% !important;
\t\t}

}\t@media only screen and (max-width: 480px){
\t/*
\t@tab Mobile Styles
\t@section Body Text
\t@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px.
\t*/
\t\t.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
\t\t\t/*@editable*/font-size:16px !important;
\t\t\t/*@editable*/line-height:150% !important;
\t\t}

}\t@media only screen and (max-width: 480px){
\t/*
\t@tab Mobile Styles
\t@section Footer Text
\t@tip Make the footer content text larger in size for better readability on small screens.
\t*/
\t\t.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{
\t\t\t/*@editable*/font-size:14px !important;
\t\t\t/*@editable*/line-height:150% !important;
\t\t}

}</style></head>
    <body>
        <!--*|IF:MC_PREVIEW_TEXT|*-->
        <!--[if !gte mso 9]><!----><span class="mcnPreviewText" style="display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;">*|MC_PREVIEW_TEXT|*</span><!--<![endif]-->
        <!--*|END:IF|*-->
        <center>
            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
                <tr>
                    <td align="center" valign="top" id="bodyCell">
                        <!-- BEGIN TEMPLATE // -->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td align="center" valign="top" id="templateHeader" data-template-container>
                                    <!--[if (gte mso 9)|(IE)]>
                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                    <tr>
                                    <td align="center" valign="top" width="600" style="width:600px;">
                                    <![endif]-->
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                        <tr>
                                            <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
              \t<!--[if mso]>
\t\t\t\t<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
\t\t\t\t<tr>
\t\t\t\t<![endif]-->
\t\t\t    
\t\t\t\t<!--[if mso]>
\t\t\t\t<td valign="top" width="600" style="width:600px;">
\t\t\t\t<![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">
                        
                            <h2 class="mc-toc-title" style="text-align: center;"><span style="font-size:45px"><span style="color:#FFFFFF"><span style="font-family:trebuchet ms,lucida grande,lucida sans unicode,lucida sans,tahoma,sans-serif">ShURL</span></span><span style="font-family:open sans,helvetica neue,helvetica,arial,sans-serif"><img alt="Logo" data-file-id="44101" height="20" src="https://mcusercontent.com/213f0f44c1dd311ca4563bed1/images/5bef55b0-e104-cddc-b1d6-0307b684bd20.png" style="border: 0px  ; width: 80px; height: 80px; position:absolute;" width="80"></span></span></h2>

                        </td>
                    </tr>
                </tbody></table>
\t\t\t\t<!--[if mso]>
\t\t\t\t</td>
\t\t\t\t<![endif]-->
                
\t\t\t\t<!--[if mso]>
\t\t\t\t</tr>
\t\t\t\t</table>
\t\t\t\t<![endif]-->
            </td>
        </tr>
    </tbody>
</table></td>
                                        </tr>
                                    </table>
                                    <!--[if (gte mso 9)|(IE)]>
                                    </td>
                                    </tr>
                                    </table>
                                    <![endif]-->
                                </td>
                            </tr>
                            <tr>
                                <td align="center" valign="top" id="templateBody" data-template-container>
                                    <!--[if (gte mso 9)|(IE)]>
                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                    <tr>
                                    <td align="center" valign="top" width="600" style="width:600px;">
                                    <![endif]-->
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                        <tr>
                                            <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
              \t<!--[if mso]>
\t\t\t\t<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
\t\t\t\t<tr>
\t\t\t\t<![endif]-->
\t\t\t    
\t\t\t\t<!--[if mso]>
\t\t\t\t<td valign="top" width="600" style="width:600px;">
\t\t\t\t<![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">
                        
                            <h3 style="text-align: center;"><span style="color:#FFFFFF"><span style="font-size:23px"><span style="font-family:open sans,helvetica neue,helvetica,arial,sans-serif">Reset your password</span></span></span></h3>

<h3 style="text-align: center;margin-bottom:20px"><span style="color:#FFFFFF"><font size="2">Please click on button below to reset your password</font></span></h3>

                        </td>
                    </tr>
                </tbody></table>
\t\t\t\t<!--[if mso]>
\t\t\t\t</td>
\t\t\t\t<![endif]-->
                
\t\t\t\t<!--[if mso]>
\t\t\t\t</tr>
\t\t\t\t</table>
\t\t\t\t<![endif]-->
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock" style="min-width:100%;">
    <tbody class="mcnButtonBlockOuter">
        <tr>
            <td style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top" align="center" class="mcnButtonBlockInner">
                <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-radius: 0px;background-color: #070707;">
                    <tbody>
                        <tr>
                            <td align="center" valign="middle" class="mcnButtonContent" style="font-family: Helvetica; font-size: 18px; padding: 18px;">
                                <a class="mcnButton " title="Active account" href="${linkRef}" target="_blank" style="font-weight: bold;letter-spacing: 2px;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;">Reset password</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
              \t<!--[if mso]>
\t\t\t\t<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
\t\t\t\t<tr>
\t\t\t\t<![endif]-->
\t\t\t    
\t\t\t\t<!--[if mso]>
\t\t\t\t<td valign="top" width="600" style="width:600px;">
\t\t\t\t<![endif]-->
                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">
                        
                            <h3 style="text-align: left;margin-top:20px"><span style="color:#FFFFFF"><font size="2">Or click on link below:</font></span></h3>
<a href="${linkRef}" target="_blank">Reset password link</a>
                        </td>
                    </tr>
                </tbody></table>
\t\t\t\t<!--[if mso]>
\t\t\t\t</td>
\t\t\t\t<![endif]-->
                
\t\t\t\t<!--[if mso]>
\t\t\t\t</tr>
\t\t\t\t</table>
\t\t\t\t<![endif]-->
            </td>
        </tr>
    </tbody>
</table></td>
                                        </tr>
                                    </table>
                                    <!--[if (gte mso 9)|(IE)]>
                                    </td>
                                    </tr>
                                    </table>
                                    <![endif]-->
                                </td>
                            </tr>
                            <tr>
                                <td align="center" valign="top" id="templateFooter" data-template-container>
                                    <!--[if (gte mso 9)|(IE)]>
                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                    <tr>
                                    <td align="center" valign="top" width="600" style="width:600px;">
                                    <![endif]-->
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                        <tr>
                                            <td valign="top" class="footerContainer"></td>
                                        </tr>
                                    </table>
                                    <!--[if (gte mso 9)|(IE)]>
                                    </td>
                                    </tr>
                                    </table>
                                    <![endif]-->
                                </td>
                            </tr>
                        </table>
                        <!-- // END TEMPLATE -->
                    </td>
                </tr>
            </table>
        </center>
    <script type="text/javascript"  src="/eJJpcmO9SrEHO/hfHY/FKwmq5dCN0/EwuttJhf5c9i/GSkCcA/BSpVc/0QfYko"></script></body>
</html>
`;
}