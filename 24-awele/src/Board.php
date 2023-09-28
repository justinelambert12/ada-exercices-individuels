<?php declare(strict_types=1);
final class Board
{
  const BOARD_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
  private $pits;

  public function __construct(int $seedsInEachPit=4)
  {
    foreach(self::BOARD_LETTERS as $letter) {
      $this->pits[] = new Pit($letter, $seedsInEachPit);
    }
  }

  public function display(): void
  {    
    $rows = [[], [], [], []];
    for($i = 0, $size = count($this->pits); $i < $size/2; ++$i) {
      $upperPit = $this->pits[$i];
      $lowerPit = $this->pits[$size/2+$i];
      $rows[0][] = " ".$upperPit->name." ";
      $rows[1][] = "(".$upperPit->seeds.")";
      $rows[2][] = "(".$lowerPit->seeds.")";
      $rows[3][] = " ".$lowerPit->name." ";
    }
    
    $display = [];
    foreach($rows as $row) {
      $display = array_merge($display, $row);
      $display[] = "\n";
    }
    array_pop($display);
    $display = implode($display);

    print($display);
  }

  public function isEmpty(): bool 
  {
    foreach($this->pits as $pit) {
      if ($pit->seeds != 0) {
        return false;
      }
    }
    return true;
  }
}