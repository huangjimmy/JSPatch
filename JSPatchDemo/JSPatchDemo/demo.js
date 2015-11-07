defineClass('JPViewController', {
  "handleBtn:": function(sender) {
            var tableViewCtrl = JPTableViewController.$("alloc").$("init");
            self.$("navigationController").$("pushViewController:animated:", tableViewCtrl, YES);
  }
})

defineClass('JPTableViewController : UITableViewController <UIAlertViewDelegate>', {
  "dataSource": function() {
    var data = self.$("getProp:", 'data')
    if (data) return data;
    var data = [];
    for (var i = 0; i < 20; i ++) {
      data.push("cell from js " + i);
    }
    self.$("setProp:forKey:", data, 'data')
    return data;
  },
  "numberOfSectionsInTableView": function(tableView) {
    return 1;
  },
  "tableView:numberOfRowsInSection": function(tableView, section) {
    return self.$("dataSource").$("count");
  },
  "tableView:cellForRowAtIndexPath:": function(tableView, indexPath) {
    var cell = tableView.$("dequeueReusableCellWithIdentifier:","cell")
    if (!cell) {
      cell = require('UITableViewCell').$("alloc").$("initWithStyle:reuseIdentifier:",0, "cell")
    }
    cell.$("textLabel").$("setText:", self.
                          $("dataSource").$("objectAtIndex:", indexPath.$("row")))
    return cell
  },
    "tableView:heightForRowAtIndexPath:": function(tableView, indexPath) {
    return 60
  },
  "tableView:didSelectRowAtIndexPath:": function(tableView, indexPath) {
    //js中，只能支持一个button的alertview，因为js中不支持var args的Objc API的调用
     var alertView = require('UIAlertView').$("alloc").$("initWithTitle:message:delegate:cancelButtonTitle:otherButtonTitles:","Alert",self.$("dataSource").$("objectAtIndex:", indexPath.$("row")), self, "Cancel", nil);
            alertView.$("addButtonWithTitle:","YES");
            alertView.$("addButtonWithTitle:","NO");
     alertView.$("show")
  },
  "alertView:willDismissWithButtonIndex:": function(alertView, idx) {
    console.log('click btn ' + alertView.$("buttonTitleAtIndex:",idx))
  }
})