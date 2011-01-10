$(function() {
  HidePopoversOnDocumentClick();
  InspectorMenuSetup();
  HotlinkPopoverSetup();
  ToolbarButtonsSetup();
  $('#back_to_edit_mode').click(function(e){ BackToEditMode(); });
  $('.wrapper').hover(function(){ $(this).addClass('hover'); }, function(){ $(this).removeClass('hover'); });
  $('#share_content textarea, #comments textarea').autoResize({ extraSpace: 5 });
});

function ToolbarButtonsSetup() {
  $('#share_button').click(function(e) {
    containerFullWidth();
    $('.main_content:visible').fadeOut(200);
    $('#share_content').fadeIn(200);

    $('#storyboard_title').addClass('button_below', 100);
    $('#back_to_edit_mode').fadeIn(100);
    $('#edit_mode_buttons').fadeOut(100);
  });

  $('#add_screen_button').click(function(e) {
    containerFullWidth();
    $('.main_content:visible').fadeOut(200);
    $('#upload_instructions').fadeIn(200);

    $('#storyboard_title').addClass('button_below', 100);
    $('#back_to_edit_mode').fadeIn(100);
    $('#edit_mode_buttons').fadeOut(100);
    $('#upload_mode_buttons').fadeIn(100);
  });

  $('#preview_button').click(function(e) {
    containerPreviewMode();
    $('.main_content:visible').fadeOut(200);
    $('#comments').fadeIn(200);
    $('#iphone4').fadeIn(200);

    $('#storyboard_title').addClass('button_below', 100);
    $('#back_to_edit_mode').fadeIn(100);
    $('#edit_mode_buttons').fadeOut(100);
    $('#preview_mode_buttons').fadeIn(100);
  });

  function containerFullWidth() {
    $('#inspector').fadeOut(200);
    $('#container').addClass('full_width', 200);
  }

  function containerPreviewMode() {
    $('#inspector').fadeOut(200);
    $('#container').addClass('preview', 200);
  }
}

function BackToEditMode() {
  $('#inspector').fadeIn(200);

  var classToRemove = $('#container').hasClass('full_width') ? 'full_width' : 'preview';
  $('#container').removeClass(classToRemove, 200);

  $('#iphone4').fadeOut(100);

  $('.main_content:visible').fadeOut(200);
  $('#stage').fadeIn(200);

  $('#storyboard_title').removeClass('button_below', 100);
  $('#back_to_edit_mode').fadeOut(100);

  $('#edit_mode_buttons').fadeIn(100);
  $('#preview_mode_buttons').fadeOut(100);
  $('#upload_mode_buttons').fadeOut(100);
}

function HidePopoversOnDocumentClick() {
  $(document).click(function(e) {
    var notInsidePopover  = $(e.target).closest('.popover').length == 0;
    var notHotLink        = $(e.target).closest('#inspector .hotlink').length == 0;
    var notMenuButton     = $(e.target).attr('id') != 'menu_button';
    if(notInsidePopover && notMenuButton && notHotLink) { hideAllPopovers(); }
  });
}

function hideAllPopovers() {
  $('.popover').fadeOut(100);
  $('#menu_button').removeClass('active');
}


function InspectorMenuSetup() {
  $('#menu_button').click(function(e) {
    $('#menu_popover').is(':visible') ? hideAllPopovers() : enableInspectorMenu();
  });
}

function enableInspectorMenu() {
  $('#menu_button').addClass('active');
  $('#menu_popover').fadeIn(50);
}


function HotlinkPopoverSetup() {
  $('#screen_container .hotlink').click(function(e) {
    $('.hotlink_popover').is(':visible') ? hideAllPopovers() : enableHotlinkPopover(e);
  });
}

function enableHotlinkPopover(e) {
  var hotlink = $(e.target);
  var x       = hotlink.offset().left;
  var y       = hotlink.offset().top;
  var popover = $('.hotlink_popover');

  popover.css({
     'top': y - 105,
    'left': x - 35
  }).fadeIn(50);
}
