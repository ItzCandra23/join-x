"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/bds/command");
const command_2 = require("bdsx/command");
const nativetype_1 = require("bdsx/nativetype");
const __1 = require("..");
const cmd = command_2.command.register("joinx", "Customize JoinX configuration.", command_1.CommandPermissionLevel.Operator);
// JoinTitle Commands
cmd.overload((p, o) => {
    if (p.set === "title")
        __1.JoinMain.JoinTitleConfig.setTitle(p.value);
    if (p.set === "subtitle")
        __1.JoinMain.JoinTitleConfig.setSubtitle(p.value);
}, {
    JoinTitle: command_2.command.enum("JoinX_title", "jointitle"),
    set: command_2.command.enum("JoinTitleOptions", "title", "subtitle"),
    value: nativetype_1.CxxString,
})
    .overload((p, o) => {
    __1.JoinMain.JoinTitleConfig.setEnable(p.value);
}, {
    JoinTitle: command_2.command.enum("JoinX_title", "jointitle"),
    enable: command_2.command.enum("JoinTitleEnable", "enable"),
    value: nativetype_1.bool_t,
});
// JoinUI Commands
cmd.overload((p, o) => {
    if (p.set === "title")
        __1.JoinMain.JoinUIConfig.setTitle(p.value);
    if (p.set === "content")
        __1.JoinMain.JoinUIConfig.setContent(p.value);
}, {
    JoinUI: command_2.command.enum("JoinX_ui", "joinui"),
    set: command_2.command.enum("JoinUIOptions", "title", "content"),
    value: nativetype_1.CxxString,
})
    .overload((p, o) => {
    __1.JoinMain.JoinUIConfig.setEnable(p.value);
}, {
    JoinUI: command_2.command.enum("JoinX_ui", "joinui"),
    enable: command_2.command.enum("JoinUIEnable", "enable"),
    value: nativetype_1.bool_t,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUEwRDtBQUMxRCwwQ0FBdUM7QUFDdkMsZ0RBQW9EO0FBQ3BELDBCQUE4QjtBQUU5QixNQUFNLEdBQUcsR0FBRyxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsZ0NBQXNCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFekcscUJBQXFCO0FBRXJCLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDbEIsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLE9BQU87UUFBRSxZQUFRLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEUsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLFVBQVU7UUFBRSxZQUFRLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDNUUsQ0FBQyxFQUFFO0lBQ0MsU0FBUyxFQUFFLGlCQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUM7SUFDbkQsR0FBRyxFQUFFLGlCQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUM7SUFDMUQsS0FBSyxFQUFFLHNCQUFTO0NBQ25CLENBQUM7S0FDRCxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDZixZQUFRLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDaEQsQ0FBQyxFQUFFO0lBQ0MsU0FBUyxFQUFFLGlCQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUM7SUFDbkQsTUFBTSxFQUFFLGlCQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQztJQUNqRCxLQUFLLEVBQUUsbUJBQU07Q0FDaEIsQ0FBQyxDQUFDO0FBRUgsa0JBQWtCO0FBRWxCLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDbEIsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLE9BQU87UUFBRSxZQUFRLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0QsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLFNBQVM7UUFBRSxZQUFRLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkUsQ0FBQyxFQUFFO0lBQ0MsTUFBTSxFQUFFLGlCQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUM7SUFDMUMsR0FBRyxFQUFFLGlCQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDO0lBQ3RELEtBQUssRUFBRSxzQkFBUztDQUNuQixDQUFDO0tBQ0QsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ2YsWUFBUSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzdDLENBQUMsRUFBRTtJQUNDLE1BQU0sRUFBRSxpQkFBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDO0lBQzFDLE1BQU0sRUFBRSxpQkFBTyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDO0lBQzlDLEtBQUssRUFBRSxtQkFBTTtDQUNoQixDQUFDLENBQUMifQ==