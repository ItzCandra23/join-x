import { CommandPermissionLevel } from "bdsx/bds/command";
import { command } from "bdsx/command";
import { bool_t, CxxString } from "bdsx/nativetype";
import { JoinMain } from "..";

const cmd = command.register("joinx", "Customize JoinX configuration.", CommandPermissionLevel.Operator);

// JoinTitle Commands

cmd.overload((p, o) => {
    if (p.set === "title") JoinMain.JoinTitleConfig.setTitle(p.value);
    if (p.set === "subtitle") JoinMain.JoinTitleConfig.setSubtitle(p.value);
}, {
    JoinTitle: command.enum("JoinX_title", "jointitle"),
    set: command.enum("JoinTitleOptions", "title", "subtitle"),
    value: CxxString,
})
.overload((p, o) => {
    JoinMain.JoinTitleConfig.setEnable(p.value);
}, {
    JoinTitle: command.enum("JoinX_title", "jointitle"),
    enable: command.enum("JoinTitleEnable", "enable"),
    value: bool_t,
});

// JoinUI Commands

cmd.overload((p, o) => {
    if (p.set === "title") JoinMain.JoinUIConfig.setTitle(p.value);
    if (p.set === "content") JoinMain.JoinUIConfig.setContent(p.value);
}, {
    JoinUI: command.enum("JoinX_ui", "joinui"),
    set: command.enum("JoinUIOptions", "title", "content"),
    value: CxxString,
})
.overload((p, o) => {
    JoinMain.JoinUIConfig.setEnable(p.value);
}, {
    JoinUI: command.enum("JoinX_ui", "joinui"),
    enable: command.enum("JoinUIEnable", "enable"),
    value: bool_t,
});