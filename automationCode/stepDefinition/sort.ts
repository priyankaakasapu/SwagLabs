import { pageFixture } from "../hooks/pageFixture";
import {SortPage} from '../pages/SortPage'
import {Then} from '@cucumber/cucumber'

let sp:SortPage

Then('I verify Sort Functionalities',async function(){
     sp=new SortPage(pageFixture.page)
     await sp.verifyDropdown()

})