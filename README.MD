# QUICK MOGRT REPLACE TOOL

## ABOUT

In versions 24.1 and earlier, Adobe Premiere Pro does not support batch editing of values in multiple .mogrt instances. Whether you attempt this in the Effect Controls panel or the Essential Graphics, the limitation remains. If you've used hundreds of .mogrt templates and now wish to change a color or another aspect, you must do so manually in each clip.

Some third-party plugins, like "Premiere Composer" allow you to edit values in a few clips simultaneously, but this is restricted to a maximum of eight clips at a time.

The main issue solved by the QUICK MOGRT REPLACE TOOL is the ability to replace any desired value in every instance of .mogrt preset you've utilized. I hope a future versions of Premiere might resolve this limitation, and plugin will happen unnecessary, but for now, my plugin offers a practical workaround. 

## HOW TO USE

This plugin isn't officially available in the Adobe Plugins Store. To use it on your PC, you need to first add a registry entry:
### Windows:
1) Open regedit.exe
2) Navigate to HKEY_CURRENT_USER\Software\Adobe\CSXS.11\
3) Create a new entry named: "PlayerDebugMode" 
4) Set the value of the new entry to: "1"

### MAC:
```sh
defaults write /Users//Library/Preferences/com.adobe.CSXS.11.plist PlayerDebugMode 1
```
---

All files will be working after You paste it in plugins directory:
```
C:\Program Files (x86)\Common Files\Adobe\CEP\extensions
```
The app will be available in Premiere Pro under "Window > Extensions > QUICK MOGRT REPLACE TOOL"